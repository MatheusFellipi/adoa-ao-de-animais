import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkModel } from "@modules/contacts/model/link";
import { RequestType } from "@shared/type/request.type";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class ListLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) {}
  async execute(form: LinkModel): Promise<LinkModel> {
    const instance = LinkModel.validade(form);
    const link = await this._link_repository.listByID(instance.id);
    if (!link || instance.user.id !== link.user.id)
      throw new AppError("Não e possível atualizar o link");
    return await this._link_repository.update(link, instance);
  }
}
