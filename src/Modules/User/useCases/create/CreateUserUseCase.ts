import { inject, injectable } from "tsyringe";

import { AdaptarUser } from "@modules/user/adaptar/user";
import { UserModalView } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AddressCreateMultiUseCaseController } from "@modules/address/useCases/createMulti/CreateMultiUseCaseController";
import { LinkCreateUseCaseController } from "@modules/contacts/controllers/link/create/LinksUseCaseController";
import { CreateInternalContactController } from "@modules/contacts/useCases/contact/createInternal/CreateContactsInternalController";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(data: UserModalView): Promise<UserModalView> {
    const instance = await UserModalView.validate(data);
    console.log('====================================');
    console.log(instance);
    console.log('====================================');
    const user = await this.__user_repository.create(instance);
    return AdaptarUser.userReturn(user);
  }
}
