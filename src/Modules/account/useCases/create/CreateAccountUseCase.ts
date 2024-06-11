import { inject, injectable } from "tsyringe";
import { addDays } from "date-fns";
import { AppError } from "@shared/infra/errors/AppError";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import {
  TokenModelView,
  TokenReturnModel,
} from "@modules/account/model/Token.modal";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import { CreateOrganizationController } from "@modules/organization/useCases/create/CreateOrganizationController";
import { AdaptarAccount } from "@modules/account/adaptar/account";
import { AccountModel } from "@modules/account/model/account.modal";
import { jwtHelpers } from "@shared/utils/helpers/jwt-helpers";

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(
    form: AccountModel,
    type: "user" | "organization"
  ): Promise<{ account: TokenReturnModel; refreshToken: string }> {
    const instance = AccountModel.validade(form);

    const existe = await this.__repository.findExistsBy(instance.email);
    if (existe) throw new AppError("A conta ja exite come esse e-mail");

    if (type === "organization")
      instance.organization = await CreateOrganizationController.handleInternal(
        instance.organization
      );
    else if (type === "user")
      instance.user = await CreateUserController.handleInternal(instance.user);

    instance.password = await AccountModel.crypto_password(instance.password);

    const account = await this.__repository.create(instance);
    const { newRefreshToken, newToken } = jwtHelpers.createToken({
      email: account.email,
      id: account.id,
    });

    await this._token_repository.create({
      account: account,
      token: newRefreshToken,
      expires_at: addDays(Date.now(), 1),
    });

    return {
      refreshToken: newRefreshToken,
      account: AdaptarAccount.accountReturn({
        token: newToken,
        avatar: account[type].avatar,
        email: account.email,
        name: account[type].name,
      }),
    };
  }
}
