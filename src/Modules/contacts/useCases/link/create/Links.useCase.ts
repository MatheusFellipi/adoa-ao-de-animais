import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/model/link";


@injectable()
export class CreateLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModelView): Promise<LinkModelView> {
    const instance = LinkModelView.validade(form)
    return await this._link_repository.create(instance)
  }
}
