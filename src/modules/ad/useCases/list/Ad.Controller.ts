import { Request, Response } from "express";
import { container } from "tsyringe";

import { AdListUseCase } from "./Ad.UseCase";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";

export class AdListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query;
    const { id } = request.params

    const adsList = container.resolve(AdListUseCase);
    const ads = await adsList.execute({
      ad_id: id,
      size: parseInt(query.size as string ),
      gender: parseInt(query.gender as string),
      page: parseInt(query.page  as string ?? "1" ),
      limit: parseInt(query.limit  as string ?? "10" ),
      title: query.title as string,
      type: AnimalAdType[query.type as string],
      sortField: query.sortField as string,
      sortOrder: SortOrderEnum[query.sortOrder as string],
    });

    return response.status(200).json(ads);
  }
}
