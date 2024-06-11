import { inject, injectable } from "tsyringe";

import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { RequestType } from "@shared/type/request.type";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class UpdateAdUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(
    form: AnimalAdNModel,
    account: { id: number },
    type: RequestType
  ): Promise<AnimalAdNModel> {
    const instance = AnimalAdNModel.validade(form);
    const ad = await this._ad_repository.findById(instance.id);
    if (ad.animal[type].id !== account.id) throw new AppError("Não e possível atualizar");
    return await this._ad_repository.update(instance, ad);
  }
}
