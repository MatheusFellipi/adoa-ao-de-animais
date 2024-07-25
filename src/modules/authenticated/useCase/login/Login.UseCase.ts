import { addDays } from "date-fns";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/utils/errors/AppError";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";

import { AdaptarAccount } from "@modules/account/adaptar/account";
import { TokenReturnModel } from "@modules/account/model/Token.modal";
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
  ): Promise<TokenReturnModel> {
    const instance = await AuthenticatedModel.validade(form);
    const account = await this.__repository.findByEmail(instance.email);
    if (!account) throw new AppError("o email ou a senha esta incorreta");
    const passwordMatch = await AuthenticatedModel.equals_password(
      instance.password,
      account.password
    );
    if (!passwordMatch) throw new AppError("Email oo password incorrect!");
    const newRefreshToken = jwtHelpers.createToken({
      email: account.email,
      id: account.id,
    });
    const tokenAccount = await this._token_repository.findByAccountID(
      account.id
    );
    if (account.user && tokenAccount.length >= 4)
      this._token_repository.delete(tokenAccount[0].id);
    await this._token_repository.create({
      account: account,
      token: newRefreshToken,
      expires_at: addDays(Date.now(), 7),
    });
    return AdaptarAccount.accountReturn({
      token: newRefreshToken,
      avatar: account.user.avatar,
      email: account.email,
      name: account.user.name,
    });
  }
}
