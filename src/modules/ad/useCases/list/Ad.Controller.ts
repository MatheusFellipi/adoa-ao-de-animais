import { Request, Response } from "express";
import { container } from "tsyringe";

import { AdListUseCase } from "./Ad.UseCase";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";

export class AdListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      type,
      ad_id,
      size,
      gender,
      page,
      limit,
      sortField,
      sortOrder,
    } = request.params;

    const adsList = container.resolve(AdListUseCase);

    const ads = await adsList.execute({
      size: parseInt(size),
      gender: parseInt(gender),
      page: parseInt(page),
      limit: parseInt(limit),
      title,
      type: AnimalAdType[type],
      sortField,
      sortOrder: SortOrderEnum[sortOrder],
    });

    return response.status(200).json(ads);
  }
}
