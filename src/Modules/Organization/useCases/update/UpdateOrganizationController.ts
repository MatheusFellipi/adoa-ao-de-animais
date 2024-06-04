import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateOrganizationUseCase } from "./UpdateOrganizationUseCase";

export class CreateOrganizationController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { cnpj_cpf, name, operation_at, type, description } = request.body;
    const createUserUseCase = container.resolve(UpdateOrganizationUseCase);
    const token = await createUserUseCase.execute(
      { name, cnpj_cpf, operation_at, type, description }, request.account.organization);
    return response.status(200).json(token);
  }
}
