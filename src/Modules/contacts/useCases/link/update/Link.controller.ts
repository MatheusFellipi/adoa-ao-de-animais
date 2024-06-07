import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateLinkUseCase } from "./Links.useCase";

export class UpdateLinkController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const { id } = request.params
    const link = container.resolve(UpdateLinkUseCase);
    const data = await link.execute({
      name,
      url,
      id: parseInt(id),
    });
    return response.status(200).json(data);
  }
}
