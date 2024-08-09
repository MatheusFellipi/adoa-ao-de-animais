import { inject, injectable } from "tsyringe";

import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";

@injectable()
export class AdDeleteUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(
    id: number,
    account: { id: number },
  ): Promise<void> {
    const ad = await this._ad_repository.findById(id);
    await this._ad_repository.delete(ad);
  }
}
