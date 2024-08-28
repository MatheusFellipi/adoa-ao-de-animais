import { inject, injectable } from "tsyringe";

import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class AdDeleteUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(id: string, account_id: string): Promise<void> {
    const ad = await this._ad_repository.findById(id);
    if (account_id !== ad.animal.user.id) {
      throw new AppError("Nao e possível deleta o ad no momento")
    } 
    await this._ad_repository.delete(ad.id);
  }
}
