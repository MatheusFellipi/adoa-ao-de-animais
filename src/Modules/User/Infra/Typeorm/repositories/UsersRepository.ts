import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { User } from "../entities/users.entity";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private __repository: Repository<User>;

  constructor() {
    this.__repository = dbContext.getRepository(User);
  }

  async create({ name, avatar, addresses, contacts, links }: IUserDtos): Promise<User> {
    const user = this.__repository.create({ name, avatar});
    return await this.__repository.save(user);
  }

  async findById(id: number): Promise<User> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { addresses: true }
    });
  }
}