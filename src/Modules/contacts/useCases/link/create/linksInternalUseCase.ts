import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/modelView/link";
import { AdaptarLink } from "@modules/contacts/adaptar/link";


@injectable()
export class LinkCreateInternalUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModelView[], relation: Object, key: "user" | "organization"): Promise<LinkModelView[]> {
    const link = form.map(item => (
      {
        [key]: relation,
        ...item
      }
    ))
    return AdaptarLink.linkReturn(await this._link_repository.createMulti(link))
  }
}
