import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../typeorm/entities/Token.entity";

export interface ITokenRepository {
  create(data: ITokenDtos): Promise<Tokens>;
  delete(id: string): Promise<void>;
  deleteByAccount(id: string): Promise<void>
  update(token: ITokenDtos, change_data: ITokenDtos): Promise<Tokens>;
  findByToken(token: string): Promise<Tokens>;
  findByAccountID(found: string): Promise<Tokens[]>;
}
