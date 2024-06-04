import { inject, injectable } from "tsyringe";

import { AdaptarUser } from "@modules/user/adaptar/user";
import { UserModalView } from "@modules/user/modelView/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AddressCreateMultiUseCaseController } from "@modules/address/useCases/createMulti/CreateMultiUseCaseController";
import { LinkCreateUseCaseController } from "@modules/contacts/controllers/link/create/LinksUseCaseController";
import { ContactCreateUseCaseController } from "@modules/contacts/controllers/contact/create/ContactsCreateUseCaseController";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
  ) { }
  async execute(data: UserModalView): Promise<UserModalView> {
    const instance = await UserModalView.validate(data)
    const user = await this.__user_repository.create(instance);
    const address = await AddressCreateMultiUseCaseController.handle(instance.addresses, user, "user")
     let link = []
     if (instance.links) 
       link = await LinkCreateUseCaseController.handleInternal(instance.links, user, "user")
     let contacts = []
     if (instance.contacts) 
       contacts = await ContactCreateUseCaseController.handleInternal(instance.contacts, user, "user")
    return AdaptarUser.userReturn(address, user, link, contacts)
  }
}