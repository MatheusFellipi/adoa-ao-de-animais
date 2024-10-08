import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteContactUseCase } from "./Contact.useCase";

export class DeleteContactController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const account = request.account
    const contact = container.resolve(DeleteContactUseCase);
    await contact.execute(id, account.id);
    return response.status(200).json({
      message: "O contado foi excluída permanentemente",
    });
  }
}
