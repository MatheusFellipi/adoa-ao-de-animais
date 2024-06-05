import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"


import { ITokenRepository } from "../../repositories/ITokenRepository";
import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../entities/Token.Entity";

export class TokenRepository implements ITokenRepository {
  private __repository: Repository<Tokens>;

  constructor() {
    this.__repository = dbContext.getRepository(Tokens);
  }
  async deleteAll(id: number): Promise<void> {
    await this.__repository.delete({
      account: {
        id: id
      }
    });
  }

  async create(data: ITokenDtos): Promise<Tokens> {
    return await this.__repository.save(this.__repository.create(data))
  }

  async findByAccountID(found: number): Promise<Tokens[]> {
    return await this.__repository.find({
      where: {
        account: {
          id: found
        }
      }
    })
  }


}