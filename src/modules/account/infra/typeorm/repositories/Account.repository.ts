import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { IAccountRepository } from "../../repositories/IAccountRepository";
import { IAccountDtos } from "@modules/account/dtos/account.dtos";
import { Account } from "../entities/Account.entity";

export class AccountRepository implements IAccountRepository {
  private __repository: Repository<Account>;

  constructor() {
    this.__repository = dbContext.getRepository(Account);
  }

  async delete(account: IAccountDtos): Promise<void> {
    this.__repository.delete({
      id: account.id
    });
  }

  async findByIdFull(id: string): Promise<Account> {
    return await this.__repository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: {
          addresses: true,
          contacts: true,
          links: true,
        },
      },
    });
  }

  async create(data: IAccountDtos): Promise<Account> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async findById(id: string): Promise<Account> {
    return await this.__repository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.__repository.findOne({
      where: {
        email: email,
      },
      relations: {
        user: true,
      },
    });
  }

  async findExistsBy(email: string): Promise<boolean> {
    return await this.__repository.existsBy({ email });
  }
}
