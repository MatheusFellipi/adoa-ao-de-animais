import { inject, injectable } from "tsyringe";

import { UserModalView } from "@modules/user/modelView/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AddressCreateMultiUseCaseController } from "@modules/address/useCases/createMulti/CreateMultiUseCaseController";
import { AdaptarUser } from "@modules/user/adaptar/user";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
  ) { }
  async execute(data: UserModalView): Promise<UserModalView> {
    const instance = await UserModalView.validate(data)
    const user = await this.__user_repository.create(instance);
     const address = await AddressCreateMultiUseCaseController.handle(instance.addresses, user, "user")
    return AdaptarUser.userReturn(address, user)
  }
}