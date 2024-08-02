import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAddressUseCase } from "./Address.UseCase";

export class DeleteAddressController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const account_id = request.account.id
    const authenticateUserUseCase = container.resolve(DeleteAddressUseCase);
    const token = await authenticateUserUseCase.execute(id, account_id);
    return response.status(204).json(token);
  }
}
