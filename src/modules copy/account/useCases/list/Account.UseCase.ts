import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";

@injectable()
export class ListAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository
  ) {}
  async execute(account_id: number): Promise<any> {
    const account = await this.__repository.findByIdFull(account_id)
    return account
  }
}
