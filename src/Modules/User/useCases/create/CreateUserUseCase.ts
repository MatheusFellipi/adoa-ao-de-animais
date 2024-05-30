import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UserModalView } from "@modules/user/modelView/user";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
    @inject("IUsersRepository") private __address_repository: IAddressRepository
  ) { }
  async execute(data: UserModalView): Promise<User> {
    const instance = await UserModalView.validate(data)

    data.addresses.forEach(async (element) => {
      element.user = instance
      await this.__address_repository.create(element)
    })


    return await this.__user_repository.create(instance);
  }
}