import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/modelView/link";
import { AdaptarLink } from "@modules/contacts/adaptar/link";


@injectable()
export class LinkUseCase {
  constructor(
    @inject("IContactRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModelView[]): Promise<LinkModelView[]> {
    return AdaptarLink.linkReturn(await this._link_repository.create(link))
  }
}
