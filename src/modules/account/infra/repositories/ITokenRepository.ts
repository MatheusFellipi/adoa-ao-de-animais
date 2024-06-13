import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../typeorm/entities/Token.entity";

export interface ITokenRepository {
  create(data: ITokenDtos): Promise<Tokens>;
  delete(id: number): Promise<void>;
  update(token: ITokenDtos, change_data: ITokenDtos): Promise<Tokens>;
  findByAccountID(found: number): Promise<Tokens[]>;
}
