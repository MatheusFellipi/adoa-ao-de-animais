import { inject, injectable } from "tsyringe";

import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { RequestType } from "@shared/type/request.type";

@injectable()
export class DeleteLinkUseCase {
  constructor(
    @inject("ILinkRepository") private _link_repository: ILinkRepository
  ) {}
  async execute(id: number, account: { id: number }, type: RequestType): Promise<void> {
    const link = await this._link_repository.listByID(id);
    if (!link || link[type].id !== account.id)
      throw new AppError("Não foi possível deletar a rede social ou o site");
    return await this._link_repository.delete(link);
  }
}
