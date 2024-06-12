import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContactUseCase } from "./Contact.useCase";

export class CreateContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, type } = request.body;
    const type_account = request.type;
    const account = request.account[type_account];
    const contact = container.resolve(CreateContactUseCase);
    const data = await contact.execute({
      name,
      phone,
      type,
      [type_account]: account,
    });
    return response.status(200).json(data);
  }
}
