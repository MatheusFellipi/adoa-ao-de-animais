import { IAccountRepository } from "../IAccountRepository";
import { IAccountDtos } from "@modules/account/dtos/account.dtos";
import { Account } from "../../typeorm/entities/Account.entity";

export class AccountRepositoryInMemory implements IAccountRepository {
  private _account: Account[] = [];

  async create(data: IAccountDtos): Promise<Account> {
    const account = new Account();
    Object.assign(account, data);
    this._account.push(account);
    return account;
  }

  async findById(id: string): Promise<Account> {
    return this._account.find((x) => x.id === id);
  }
  
  async findByIdFull(id: string): Promise<Account> {
    return this._account.find((x) => x.id === id);
  }
  
  async findExistsBy(email: string): Promise<boolean> {
    const ex = this._account.find((x) => x.email === email);
    return !!ex
  }
  
  async findByEmail(email: string): Promise<Account> {
    return this._account.find((x) => x.id === email);
  }
}
