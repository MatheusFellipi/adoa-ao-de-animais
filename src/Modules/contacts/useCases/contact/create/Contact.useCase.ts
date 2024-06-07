import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactModel } from "@modules/contacts/model/contact";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateContactUseCase {
  constructor(
    @inject("IContactRepository") private _link_repository: IContactRepository
  ) { }
  async execute(form: ContactModel): Promise<ContactModel> {
    const instance = ContactModel.validade(form)
    return await this._link_repository.create(instance)
  }
}
