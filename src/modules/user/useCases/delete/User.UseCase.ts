import { inject, injectable } from "tsyringe";
import configAws from "@shared/services/aws/delete.s3"

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { UserModal } from "@modules/user/model/user";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(account: UserModal, id_params: number): Promise<void> {
    if (account.id !== id_params)
      throw new AppError("Não e possível deletar a conta ");
    if (account.avatar) configAws.delete(account.avatar);
    await this.__user_repository.delete(account);
    return;
  }
}
