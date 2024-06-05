import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../typeorm/entities/Token.Entity";

export interface ITokenRepository {
  create(data: ITokenDtos): Promise<Tokens>;
  deleteAll(ids: number): Promise<void>;
  findByAccountID(found: number): Promise<Tokens[]>
}

