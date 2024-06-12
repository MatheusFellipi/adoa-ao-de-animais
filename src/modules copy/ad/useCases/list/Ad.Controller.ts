import { Request, Response } from "express";
import { container } from "tsyringe";

import { AdListUseCase } from "./Ad.UseCase";

export class AdListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      type,
      ad_id,
      size,
      gender,
      organization_id,
      user_id,
      page,
      limit,
      sortField,
      sortOrder,
    } = request.params;

    const account = request.account[request.type];
    let account_id = organization_id ?? user_id;


    const adsList = container.resolve(AdListUseCase);

    const ads = await adsList.execute({
      ad_id: parseInt(ad_id),
      account_id: parseInt(account_id),
      size: parseInt(size),
      gender: parseInt(gender),
      organization_id: parseInt(organization_id),
      user_id: parseInt(user_id),
      page: parseInt(page),
      limit: parseInt(limit),
      sortField,
      sortOrder: parseInt(sortOrder),
    });

    return response.status(200).json(ads);
  }
}
