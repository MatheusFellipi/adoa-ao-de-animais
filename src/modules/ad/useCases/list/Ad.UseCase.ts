import { inject, injectable } from "tsyringe";

import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { AdQueryModal } from "@modules/ad/model/query";
import { IAdQueryDtos } from "@modules/ad/dtos/IAdQueryDtos";

@injectable()
export class AdListUseCase {
  constructor(@inject("IAdRepository") private _ad_repository: IAdRepository) {}
  async execute(form: AdQueryModal): Promise<AnimalAdNModel[]> {
    const instance = AdQueryModal.validade(form);

    let criteria: IAdQueryDtos = {};

    criteria.page = instance.page;
    criteria.limit = instance.limit;
    criteria.sortField = instance.sortField;
    criteria.sortOrder = instance.sortOrder;

    if (instance.ad_id) criteria.ad_id = instance.ad_id;

    if (instance.organization_id)
      criteria.organization = { id: instance.organization_id };
    if (instance.user_id) criteria.user = { id: instance.user_id };

    if (instance.size) criteria.size = instance.size;
    if (instance.title) criteria.title = instance.title;
    if (instance.description) criteria.description = instance.description;
    if (instance.type) criteria.type = instance.type;
    if (instance.size) criteria.size = instance.size;
    if (instance.gender) criteria.gender = instance.gender;

    return await this._ad_repository.find(criteria);
  }
}
