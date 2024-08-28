import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdUseCase } from "./Ad.UseCase";

export class ADUpdatesCreateController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, type, animal } = request.body;
    const { id } = request.params;
    const authenticateUserUseCase = container.resolve(UpdateAdUseCase);
    const token = await authenticateUserUseCase.execute({
      id,
      title,
      description,
      type,
      animal,
    });
    return response.status(200).json(token);
  }
}
