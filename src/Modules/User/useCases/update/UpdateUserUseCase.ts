import { inject, injectable } from "tsyringe";
import configAws from "@config/aws"

import { User } from "@modules/user/infra/typeorm/entities/Users.Entity";

import { AdapterUser } from "@modules/user/adapter/user";
import { UserUpdateModalView } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";


@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
  ) { }
  async execute(form: UserUpdateModalView, data_user: User): Promise<UserUpdateModalView> {
    const instance = await UserUpdateModalView.validate(form)

    if (data_user.avatar && instance.avatar) {
        configAws.delete(data_user.avatar)
    }

    const user_update = await this.__user_repository.update(data_user, instance);
    return AdapterUser.userUpdateReturn(user_update)
  }
}