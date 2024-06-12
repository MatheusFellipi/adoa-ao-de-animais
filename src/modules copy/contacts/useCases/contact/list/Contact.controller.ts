import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListContactUseCase } from "./Contact.useCase";

export class ListContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, organization_id } = request.query;
    let account_id = null;
    const type_account = request.type;
    const account = request.account[type_account];
    const contact = container.resolve(ListContactUseCase);
    if (!user_id || !organization_id) account_id = account.id;
    else if (typeof user_id === "string" && typeof organization_id === "string")
      account_id = parseInt(user_id ?? organization_id);
    const data = await contact.execute(account_id);
    return response.status(200).json(data);
  }
}
