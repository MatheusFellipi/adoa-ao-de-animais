import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { User } from "../entities/Users.entity";
import { IUserDtos, IUserUpdateDtos } from "@modules/user/dtos/IUserDtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private __repository: Repository<User>;

  constructor() {
    this.__repository = dbContext.getRepository(User);
  }

  async findByCpfCnpj(found: string): Promise<boolean> {
    return await this.__repository.exists({ where: { cnpj_cpf: found } });
  }

  async delete(user: IUserDtos): Promise<void> {
    this.__repository.delete(user);
  }

  async create(data: IUserDtos): Promise<User> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async update(user: User, change_date: IUserUpdateDtos): Promise<User> {
    this.__repository.merge(user, change_date);
    return await this.__repository.save(user);
  }

  async findByAccountId(id: string): Promise<User> {
    return await this.__repository.findOne({
      where: {
        account: {
          id: id,
        },
      },
    });
  }

  async findById(id: string): Promise<User> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { addresses: true },
    });
  }
}
