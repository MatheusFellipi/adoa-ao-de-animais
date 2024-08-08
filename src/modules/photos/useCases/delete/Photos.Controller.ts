import { container } from "tsyringe";

import { Request, Response } from "express";
import { ListContactUseCase } from "@modules/contacts/useCases/contact/list/Contact.useCase";

export class CreatePhotosController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { photos } = request.body;
    const contact = container.resolve(ListContactUseCase);
    const data = await contact.execute(photos);
    return response.status(200).json(data);
  }
}
