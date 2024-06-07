import { inject, injectable } from "tsyringe";
import { addDays } from "date-fns";
import { AppError } from "@shared/infra/errors/AppError";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { TokenModelView } from "@modules/account/model/Token.modal";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { CreateUserController } from "@modules/user/useCases/create/CreateUserController";
import { CreateOrganizationController } from "@modules/organization/useCases/create/CreateOrganizationController";
import { AdaptarAccount } from "@modules/account/adaptar/account";
import { AccountModel } from "@modules/account/model/account.modal";
import { AccountReturnNotPasswordModel } from "@modules/account/model/accountReturnNotPassword.modal";

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(
    form: AccountModel,
    type: "user" | "organization"
  ): Promise<AccountReturnNotPasswordModel> {
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

    const token_instancia = await TokenModelView.create_token({
      email: account.email,
      id: account.id,
    });

    const token = await this._token_repository.create({
      account: account,
      token: token_instancia,
      expires_at: addDays(Date.now(), 1),
    });

    return AdaptarAccount.accountReturn({
      token: token,
      avatar: account[type].avatar,
      email: account.email,
      name: account[type].name,
    });
  }
}
