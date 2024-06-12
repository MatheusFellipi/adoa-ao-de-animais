import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAddressUseCase } from "./Address.UseCase";

export class DeleteAddressController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const account = request.account[request.type];
    const authenticateUserUseCase = container.resolve(DeleteAddressUseCase);
    const token = await authenticateUserUseCase.execute(
      parseInt(id),
      account,
      request.type
    );
    return response.status(200).json(token);
  }
}
