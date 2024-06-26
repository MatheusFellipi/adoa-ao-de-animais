import { Request, Response } from "express";
import { container } from "tsyringe";

import { AdDeleteUseCase } from "./Ad.UseCase";

export class AdDeleteController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const authenticateUserUseCase = container.resolve(AdDeleteUseCase);
    const token = await authenticateUserUseCase.execute(
      parseInt(id),
      request.account[request.type],
      request.type
    );
    return response.status(200).json(token);
  }
}
