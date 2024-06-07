import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/model/link";
import { AdaptarLink } from "@modules/contacts/adaptar/link";


@injectable()
export class LinkCreateUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModelView[]): Promise<LinkModelView[]> {
    return AdaptarLink.linkReturn(await this._link_repository.create(link))
  }
}
