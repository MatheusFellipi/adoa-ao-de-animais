import { inject, injectable } from "tsyringe";

import { UserModalView } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AdapterUser } from "@modules/user/adapter/user";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(data: UserModalView): Promise<UserModalView> {
    const instance = await UserModalView.validate(data);
    const user = await this.__user_repository.create(instance);
    return AdapterUser.userReturn(user);
  }
}
