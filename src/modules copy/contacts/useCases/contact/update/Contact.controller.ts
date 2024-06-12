import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateContactUseCase } from "./Contact.useCase";

export class UpdateContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, type } = request.body;
    const { id } = request.params;
    
    const link = container.resolve(UpdateContactUseCase);
    const data = await link.execute({
      name,
      phone,
      type,
      id: parseInt(id),
    },
    request.account[request.type],
    request.type
  );
    return response.status(200).json(data);
  }
}
