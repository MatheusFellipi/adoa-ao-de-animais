import { inject, injectable } from "tsyringe";
import { addDays } from "date-fns";
import { AppError } from "@shared/infra/errors/AppError";

import { TokenModelView } from "@modules/account/model/Token.modal";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";

import { AdaptarAccount } from "@modules/account/adaptar/account";
import { AccountModel } from "@modules/account/model/account.modal";
import { AccountReturnNotPasswordModel } from "@modules/account/model/accountReturnNotPassword.modal";


@injectable()
export class AuthenticatedAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(
    form: AccountModel
  ): Promise<AccountReturnNotPasswordModel> {
    const instance = AccountModel.validade(form);
    const account = await this.__repository.findByEmail(instance.email);

    if (!account) throw new AppError("o email ou a senha esta incorreta");

    const passwordMatch = await AccountModel.equals_password(
      instance.password,
      account.password
    );

    if (!passwordMatch) throw new AppError("Email or password incorrect!");

    const token_instancia = await TokenModelView.create_token({
      email: account.email,
      id: account.id,
    });
    const token_account = await this._token_repository.findByAccountID(
      account.id
    );

    if (
      (account.organization && token_account.length >= 1) ||
      (account.user && token_account.length >= 2)
    )
      this._token_repository.deleteAll(account.id);

    const token_save = await this._token_repository.create({
      account: account,
      token: token_instancia,
      expires_at: addDays(Date.now(), 1),
    });

    return AdaptarAccount.accountReturn({
      token: token_save,
      avatar: account.organization?.avatar ?? account.user?.avatar,
      email: account.email,
      name: account.organization?.name ?? account.user?.name,
    });
  }
}
