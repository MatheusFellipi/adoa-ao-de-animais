import { inject, injectable } from "tsyringe";

import { AdaptarContact } from "@modules/contacts/adaptar/contacts";
import { ContactModelView } from "@modules/contacts/modelView/contact";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";


@injectable()
export class ContactCreateInternalUseCase {
  constructor(
    @inject("IContactRepository") private _link_repository: IContactRepository
  ) { }
  async execute(form: ContactModelView[], relation: Object, key: "user" | "organization"): Promise<ContactModelView[]> {
    const link = form.map(item => (
      {
        [key]: relation,
        ...item
      }
    ))
    return AdaptarContact.contactReturn(await this._link_repository.createMulti(link))
  }
}
