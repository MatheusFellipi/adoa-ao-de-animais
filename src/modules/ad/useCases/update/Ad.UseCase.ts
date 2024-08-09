import { inject, injectable } from "tsyringe";

import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";


@injectable()
export class UpdateAdUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(
    form: AnimalAdNModel,
    account: { id: number },
  ): Promise<AnimalAdNModel> {
    const instance = await AnimalAdNModel.validade(form);
    const ad = await this._ad_repository.findById(instance.id);
    return await this._ad_repository.update(instance, ad);
  }
}
