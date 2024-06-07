import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListLinkUseCase } from "./Links.useCase";

export class ListLinkController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const type_account = request.type;
    const account = request.account[type_account];
    const contact = container.resolve(ListLinkUseCase);
    const data = await contact.execute(account[type_account].id);
    return response.status(200).json(data);
  }
}
