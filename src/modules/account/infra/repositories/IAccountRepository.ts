import { IAccountDtos } from "@modules/account/dtos/account.dtos";
import { Account } from "../typeorm/entities/Account.entity"

export interface IAccountRepository {
  create(data: IAccountDtos): Promise<Account>;
  findById(id: number): Promise<Account>;
  findByIdFull(id: number): Promise<Account>;
  findExistsBy(email: string): Promise<boolean>
  findByEmail(email: string): Promise<Account>
}

