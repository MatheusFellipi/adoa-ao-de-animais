import { inject, injectable } from "tsyringe";

import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { RequestType } from "@shared/type/request.type";

import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class AdDeleteUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(
    id: number,
    account: { id: number },
    type: RequestType
  ): Promise<void> {
    const ad = await this._ad_repository.findById(id);
    if (ad.animal[type].id !== account.id) throw new AppError("Não e possível deletar o ad");
    await this._ad_repository.delete(ad);
  }
}
