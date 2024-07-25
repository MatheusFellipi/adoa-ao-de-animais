import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";

@injectable()
export class ListAccountUseCase {
  constructor(
    @inject("IAccountRepository") private __repository: IAccountRepository
  ) {}
  async execute(account_id: string): Promise<Omit<Account, "password">> {
    const account = await this.__repository.findByIdFull(account_id);
    const { password, ...accountWithoutPassword } = account;
    return accountWithoutPassword;
  }
}
