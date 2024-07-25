import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { DeleteUserController } from "@modules/user/useCases/delete/User.Controller";

@injectable()
export class DeleteAccountUseCase {
  constructor(
    @inject("IAccountRepository") private _repository: IAccountRepository,
    @inject("ITokenRepository") private _tokenRepository: ITokenRepository
  ) {}

  async execute(accountId: string): Promise<void> {
    const account = await this._repository.findById(accountId);
    await DeleteUserController.internalHandle(account.user.id);
    this._tokenRepository.deleteByAccount(account.id)
    this._repository.delete(account)
  }
}
