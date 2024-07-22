import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { ITokenRepository } from "../../repositories/ITokenRepository";
import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../entities/Token.entity";

export class TokenRepository implements ITokenRepository {
  private __repository: Repository<Tokens>;

  constructor() {
    this.__repository = dbContext.getRepository(Tokens);
  }

  async findByToken(token: string): Promise<Tokens> {
    return await this.__repository.findOne({
      where: {
        token,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.__repository.delete({ id: id });
  }

  async update(token: Tokens, change_data: ITokenDtos): Promise<Tokens> {
    this.__repository.merge(token, change_data);
    return await this.__repository.save(token);
  }

  async deleteAll(id: string): Promise<void> {
    await this.__repository.delete({
      account: {
        id: id,
      },
    });
  }

  async create(data: ITokenDtos): Promise<Tokens> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async findByAccountID(found: string): Promise<Tokens[]> {
    return await this.__repository.find({
      where: {
        account: {
          id: found,
        },
      },
      order: {
        expires_at: "DESC",
      },
    });
  }
}
