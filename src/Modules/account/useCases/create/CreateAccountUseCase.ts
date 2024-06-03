import { inject, injectable } from "tsyringe";
import { addDays } from "date-fns";

import { AppError } from "@shared/infra/errors/AppError";
import { AccountModelView } from "@modules/account/modelView/account.modalView";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { TokenModelView } from "@modules/account/modelView/Token.modal";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";



@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository,
    @inject("ITokenRepository") private _account_repository: ITokenRepository
  ) { }

  async execute(data: AccountModelView): Promise<AccountModelView> {
    const instance = AccountModelView.validade(data);

    const existe = await this.__repository.findExistsBy(instance.email)
    if (existe) throw new AppError("A conta ja exite come esse e-mail")

    instance.password = await AccountModelView.crypto_password(instance.password)
    
    const account = await this.__repository.create(instance)
    const token_instancia = await TokenModelView.create_token(account)
    
    this._account_repository.create({
      account: account,
      token: token_instancia,
      expires_at: addDays(Date.now(), 1)
    })

    return account
  }
}
