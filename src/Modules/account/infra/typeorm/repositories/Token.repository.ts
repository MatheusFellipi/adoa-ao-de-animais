import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"


import { ITokenRepository } from "../../repositories/ITokenRepository";
import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Token } from "../entities/Token.Entity";

export class TokenRepository implements ITokenRepository {
  private __repository: Repository<Token>;

  constructor() {
    this.__repository = dbContext.getRepository(Token);
  }

  async create(data: ITokenDtos): Promise<Token> {
    return await this.__repository.save(this.__repository.create(data))
  }

  async findByAccountID(found: number): Promise<Token[]> {
    return await this.__repository.find({
      where: {
        account: {
          id: found
        }
      }
    })
  }


}