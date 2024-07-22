import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListLinkUseCase } from "./Links.useCase";

export class LinkUpdateController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const { id } = request.params;
    const account = request.account;
    const contact = container.resolve(ListLinkUseCase);
    const data = await contact.execute(
      { name, url, id, user: account },
    );
    return response.status(200).json(data);
  }
}
