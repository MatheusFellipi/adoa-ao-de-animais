import { inject, injectable } from "tsyringe";
import configAws from "@config/aws";

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { AppError } from "@shared/infra/errors/AppError";
import { UserModalView } from "@modules/user/model/user";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(account: UserModalView, id_params: number): Promise<void> {
    if (account.id !== id_params)
      throw new AppError("Não e possível deletar a conta ");
    if (account.avatar) configAws.delete(account.avatar);
    await this.__user_repository.delete(account);
    return;
  }
}
