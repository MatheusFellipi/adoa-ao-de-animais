import { inject, injectable } from "tsyringe";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class LogoutUseCase {
  constructor(
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(token:string): Promise<void> {
    const tokenDb = await this._token_repository.findByToken(token);
    await this._token_repository.delete(tokenDb.id);
  }
}
