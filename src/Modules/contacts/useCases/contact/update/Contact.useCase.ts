import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/infra/errors/AppError";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactModel } from "@modules/contacts/model/contact";
import { RequestType } from "@shared/type/request.type";

@injectable()
export class UpdateContactUseCase {
  constructor(
    @inject("IContactRepository") private _repository: IContactRepository
  ) {}
  async execute(
    form: ContactModel,
    account: { id: number },
    type: RequestType
  ): Promise<ContactModel> {
    const instance = ContactModel.validade(form);
    const contact_att = await this._repository.listByID(instance.id);
    if (!contact_att || account.id !== contact_att[type].id)
      throw new AppError("Nao foi possível atualizar os dados dos contados");
    return await this._repository.update(contact_att, instance);
  }
}
