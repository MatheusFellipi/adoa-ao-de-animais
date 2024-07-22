import { IAccountDtos } from "@modules/account/dtos/account.dtos";
import { Account } from "../typeorm/entities/Account.entity"

export interface IAccountRepository {
  create(data: IAccountDtos): Promise<Account>;
  findById(id: string): Promise<Account>;
  findByIdFull(id: string): Promise<Account>;
  findExistsBy(email: string): Promise<boolean>
  findByEmail(email: string): Promise<Account>
}

