import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/infra/errors/AppError";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactModel } from "@modules/contacts/model/contact";


@injectable()
export class UpdateContactUseCase {
  constructor(
    @inject("IContactRepository") private _repository: IContactRepository
  ) { }
  async execute(form: ContactModel): Promise<ContactModel> {
    const instance = ContactModel.validade(form)
    const link = await this._repository.listByID(instance.id)
    if (!link) 
      throw new AppError("Nao foi possível atualizar os dados dos contados")
    return await this._repository.update(link, instance)
  }
}
