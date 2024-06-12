import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModel } from "@modules/contacts/model/link";


@injectable()
export class CreateLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) { }
  async execute(form: LinkModel): Promise<LinkModel> {
    const instance = LinkModel.validade(form)
    return await this._link_repository.create(instance)
  }
}
