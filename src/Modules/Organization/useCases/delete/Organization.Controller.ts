import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteOrganizationUseCase } from "./Organization.UseCase";

export class UpdateOrganizationController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const createUserUseCase = container.resolve(DeleteOrganizationUseCase);
    const token = await createUserUseCase.execute(
      request.account.organization,
      parseInt(id)
    );
    return response.status(200).json(token);
  }
}
