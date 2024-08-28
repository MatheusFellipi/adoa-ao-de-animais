import { inject, injectable } from "tsyringe";

import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";


@injectable()
export class AdCreateUseCase {
  constructor(
    @inject("IAdRepository") private _ad_repository: IAdRepository,
  ) { }
  async execute(form: AnimalAdNModel): Promise<AnimalAdNModel> {
     const instance = await AnimalAdNModel.validade(form)
      return await this._ad_repository.create(instance)
  }
}
