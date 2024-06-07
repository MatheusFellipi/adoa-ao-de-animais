import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteLinkUseCase } from "./Links.useCase";

export class DeleteLinkController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const link = container.resolve(DeleteLinkUseCase);
    await link.execute(parseInt(id));
    return response.status(200).json({
      message: "O site/rede social foi excluída permanentemente",
    });
  }
}
