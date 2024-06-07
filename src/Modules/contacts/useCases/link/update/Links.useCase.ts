import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/model/link";


@injectable()
export class ListLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(account_id: number): Promise<LinkModelView[]> {
    return await this._link_repository.listAllByAccountID(account_id)
  }
}
