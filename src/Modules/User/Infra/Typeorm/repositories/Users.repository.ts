import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { User } from "../entities/users.entity";
import { IUserDtos, IUserUpdateDtos } from "@modules/user/dtos/IUserDtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private __repository: Repository<User>;

  constructor() {
    this.__repository = dbContext.getRepository(User);
  }

  async create({ name, avatar, addresses, contacts, links }: IUserDtos): Promise<User> {
    const user = this.__repository.create({ name, avatar, addresses, contacts, links });
    return await this.__repository.save(user);
  }

  async update(user: User, change_date: IUserUpdateDtos): Promise<User> {
    this.__repository.merge(user, change_date)
    return await this.__repository.save(user);
  }

  async findByAccountId(id: number): Promise<User> {
    return await this.__repository.findOne({
      where: {
        account: {
          id: id
        }
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { addresses: true }
    });
  }
}