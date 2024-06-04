import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { IAccountRepository } from "../../repositories/IAccountRepository";
import { IAccountDtos } from "@modules/account/dtos/account.dtos";
import { Account } from "../entities/Account.entity";

export class AccountRepository implements IAccountRepository {
  private __repository: Repository<Account>;

  constructor() {
    this.__repository = dbContext.getRepository(Account);
  }

  async create(data: IAccountDtos): Promise<Account> {
    return await this.__repository.save(this.__repository.create(data))
  }

  async findById(id: number): Promise<Account> {
    return await this.__repository.findOne({
      where: {
        id: id
      },
      relations:{
        organization:true, user: true
      }
    })
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.__repository.findOne({
      where: {
        email: email
      }
    })
  }

  async findExistsBy(found: string): Promise<boolean> {
    return await this.__repository.existsBy({ email: found })
  }
}