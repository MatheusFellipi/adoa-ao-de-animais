import { inject, injectable } from "tsyringe";

import { AdaptarUser } from "@modules/user/adaptar/user";
import { UserUpdateModalView } from "@modules/user/modelView/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
  ) { }
  async execute(form: UserUpdateModalView, data_user: any): Promise<UserUpdateModalView> {
    const instance = await UserUpdateModalView.validate(form)
    const user = await this.__user_repository.findById(data_user.id);
    user.name = instance.name
    user.avatar = instance.avatar
    const user_update = await this.__user_repository.update(user);
    return AdaptarUser.userUpdateReturn(user_update)
  }
}