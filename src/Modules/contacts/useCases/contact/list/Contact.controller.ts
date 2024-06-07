import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListContactUseCase } from "./Contact.useCase";

export class ListContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const type_account = request.type;
    const account = request.account[type_account];
    const contact = container.resolve(ListContactUseCase);
    const data = await contact.execute(account[type_account].id);
    return response.status(200).json(data);
  }
}
