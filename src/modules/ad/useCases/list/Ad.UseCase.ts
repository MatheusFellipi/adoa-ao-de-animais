import { inject, injectable } from "tsyringe";

import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { AdQueryModal } from "@modules/ad/model/query";
import { ListAd } from "@modules/ad/types/list";

@injectable()
export class AdListUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(form: AdQueryModal): Promise<ListAd> {
    const instance = AdQueryModal.validade(form);
    if (instance.ad_id)
      return await this._ad_repository.findById(instance.ad_id);
    const { data, total } = await this._ad_repository.find(instance);
    const { limit, page } = instance;
    const totalPages = Math.ceil(total / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      data,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      prevPage,
    };
  }
}
