import { inject, injectable } from "tsyringe";
import configAws from "@shared/services/aws/delete.s3";

import { User } from "@modules/user/infra/typeorm/entities/Users.entity";

import { AdapterUser } from "@modules/user/adapter/user";
import { UserUpdateModal } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(
    form: UserUpdateModal,
    data_user: User
  ): Promise<UserUpdateModal> {
    const instance = await UserUpdateModal.validate(form);

    if (data_user.avatar && instance.avatar) configAws.delete(data_user.avatar);

    const user_update = await this.__user_repository.update(
      data_user,
      instance
    );

    return user_update;
  }
}
