import { Request, Response } from "express";
import { container } from "tsyringe";

import { LinkListUseCase } from "./Links.useCase";

export class LinkListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.query;
    let account_id = user_id;
    const account = request.account;
    const link = container.resolve(LinkListUseCase);
    if (!user_id) account_id = account.id;
    const data = await link.execute(account_id as string);
    return response.status(200).json(data);
  }
}
