import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactModel } from "@modules/contacts/model/contact";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateContactUseCase {
  constructor(
    @inject("IContactRepository") private _contactsRepository: IContactRepository
  ) { }
  async execute(form: ContactModel): Promise<ContactModel> {
    const instance = await ContactModel.validade(form)
    return await this._contactsRepository.create(instance)
  }
}
