import { inject, injectable } from "tsyringe";
import configAws from "@shared/services/aws/delete.s3";

import { UserUpdateModal } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(
    form: UserUpdateModal,
  ): Promise<UserUpdateModal> {
    const instance = await UserUpdateModal.validate(form);
    const user = await this.__user_repository.findById(instance.id)
    if (user.avatar && instance.avatar) configAws.delete(user.avatar);
    const user_update = await this.__user_repository.update( user, instance );
    return user_update;
  }
}
