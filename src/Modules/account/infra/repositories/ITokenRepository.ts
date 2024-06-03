import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Token } from "../typeorm/entities/Token.Entity";

export interface ITokenRepository {
  create(data: ITokenDtos): Promise<Token>;
  findByAccountID(found: number): Promise<Token[]>
}

