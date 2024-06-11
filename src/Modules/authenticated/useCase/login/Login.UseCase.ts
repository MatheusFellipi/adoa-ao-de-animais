import { inject, injectable } from "tsyringe";
import { addDays } from "date-fns";

import { AppError } from "@shared/infra/errors/AppError";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";

import { AdaptarAccount } from "@modules/account/adaptar/account";
import { AccountReturnNotPasswordModel } from "@modules/account/model/accountReturnNotPassword.modal";
import { AuthenticatedModel } from "@modules/authenticated/model/authenticated.modal";
import { jwtHelpers } from "@shared/utils/helpers/jwt-helpers";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(
    form: AuthenticatedModel
  ): Promise<{ data: AccountReturnNotPasswordModel; refreshToken: string }> {
    const instance = AuthenticatedModel.validade(form);
    const account = await this.__repository.findByEmail(instance.email);
    if (!account) throw new AppError("o email ou a senha esta incorreta");
    const passwordMatch = await AuthenticatedModel.equals_password(
      instance.password,
      account.password
    );
    if (!passwordMatch) throw new AppError("Email oo password incorrect!");

    const { newRefreshToken, newToken } = jwtHelpers.createToken({
      email: account.email,
      id: account.id,
    });

    const tokenAccount = await this._token_repository.findByAccountID(
      account.id
    );

    if (
      (account.organization && tokenAccount.length >= 2) ||
      (account.user && tokenAccount.length >= 4)
    )
      this._token_repository.delete(tokenAccount[0].id);

    const token_save = await this._token_repository.create({
      account: account,
      token: newRefreshToken,
      expires_at: addDays(Date.now(), 7),
    });

    const return_token = AdaptarAccount.accountReturn({
      token: token_save,
      avatar: account.organization?.avatar ?? account.user?.avatar,
      email: account.email,
      name: account.organization?.name ?? account.user?.name,
    });

    return { data: return_token, refreshToken: newRefreshToken };
  }
}
