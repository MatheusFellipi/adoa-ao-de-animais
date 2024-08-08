import { AdaptarAccount } from "@modules/account/adaptar/account";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { AccountModel } from "@modules/account/model/account.modal";
import { TokenReturnModel } from "@modules/account/model/Token.modal";
import { CreateUserController } from "@modules/user/useCases/create/User.Controller";
import { AppError } from "@shared/utils/errors/AppError";
import { jwtHelpers } from "@shared/utils/helpers/jwt-helpers";
import { addDays } from "date-fns";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(form: AccountModel): Promise<TokenReturnModel> {
    const instance = await AccountModel.validade(form);
    const exist = await this.__repository.findExistsBy(instance.email);
    if (exist) throw new AppError("A conta ja exite come esse e-mail", 400);

    instance.user = await CreateUserController.handleInternal(instance.user);
    instance.password = await AccountModel.crypto_password(instance.password);
    const account = await this.__repository.create(instance);

    const newRefreshToken = jwtHelpers.createToken({
      email: account.email,
      id: account.id,
    });

    await this._token_repository.create({
      account: account,
      token: newRefreshToken,
      expires_at: addDays(Date.now(), 1),
    });
    
    return AdaptarAccount.accountReturn({
      token: newRefreshToken,
      avatar: account.user.avatar,
      email: account.email,
      name: account.user.name,
    });
  }
}
