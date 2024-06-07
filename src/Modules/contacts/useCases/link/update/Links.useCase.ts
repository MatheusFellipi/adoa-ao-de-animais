import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModelView } from "@modules/contacts/model/link";
import { AppError } from "@shared/infra/errors/AppError";


@injectable()
export class UpdateLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModelView): Promise<LinkModelView> {
    const instance = LinkModelView.validade(form)
    const link = await this._link_repository.listByID(instance.id)
    if (!link) 
      throw new AppError("A rede social ou site não se encontra na sistema")
    return await this._link_repository.update(link, instance)
  }
}
