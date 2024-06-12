import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactModel } from "@modules/contacts/model/contact";
import { inject, injectable } from "tsyringe";


@injectable()
export class ListContactUseCase {
  constructor(
    @inject("IContactRepository") private _link_repository: IContactRepository
  ) { }
  async execute(account_id: number): Promise<ContactModel[]> {
    return await this._link_repository.listAllByAccountID(account_id)
  }
}
