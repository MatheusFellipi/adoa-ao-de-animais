import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContactUseCase } from "./Contact.useCase";

export class CreateContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, type } = request.body;
    const account = request.account;
    const contact = container.resolve(CreateContactUseCase);
    const data = await contact.execute({
      name,
      phone,
      type,
      user: account,
    });
    return response.status(201).json(data);
  }
}
