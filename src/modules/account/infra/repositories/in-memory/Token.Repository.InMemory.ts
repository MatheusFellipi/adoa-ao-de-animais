import { ITokenRepository } from "../ITokenRepository";
import { ITokenDtos } from "@modules/account/dtos/token.dtos";
import { Tokens } from "../../typeorm/entities/Token.entity";

export class TokenRepositoryInMemory implements ITokenRepository {

  private _token: Tokens[] = [];

  async create(data: ITokenDtos): Promise<Tokens> {
    const token = new Tokens();
    Object.assign(token, data);
    this._token.push(token);
    return token;
  }

  async delete(id: number): Promise<void> {
    this._token = this._token.filter(token => token.id !== id);
  }

  async update(tokenData: ITokenDtos, change_data: ITokenDtos): Promise<Tokens> {
    const tokenIndex = this._token.findIndex(token => token.id === tokenData.id);
    if (tokenIndex === -1) {
      throw new Error("Token not found.");
    }
    const updatedToken = { ...this._token[tokenIndex], ...change_data };
    this._token[tokenIndex] = updatedToken;
    return updatedToken;
  }

  async findByAccountID(found: number): Promise<Tokens[]> {
    return this._token.filter((x) => x.account.id === found);
  }

  async findByToken(token: string): Promise<Tokens> {
    return this._token.find((x) => x.token === token);
  }
}
