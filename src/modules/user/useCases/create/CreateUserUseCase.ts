import { inject, injectable } from "tsyringe";

import { UserModal } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AdapterUser } from "@modules/user/adapter/user";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(data: UserModal): Promise<UserModal> {
    const instance = await UserModal.validate(data);
    console.log(instance);
    
    const user = await this.__user_repository.create(instance);
    return AdapterUser.userReturn(user);
  }
}
