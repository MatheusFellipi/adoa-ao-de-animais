import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateOrganizationUseCase } from "./Organization.UseCase";
import { OrganizationModel } from "@modules/organization/model/organization";

export class CreateOrganizationController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const {
      addresses,
      cnpj_cpf,
      name,
      operation_at,
      type,
      contacts,
      description,
      links,
    } = request.body;
    const createUserUseCase = container.resolve(CreateOrganizationUseCase);
    const token = await createUserUseCase.execute({
      name,
      addresses,
      cnpj_cpf,
      operation_at,
      type,
      contacts,
      description,
      links,
    });
    return response.status(201).json(token);
  }

  static async handleInternal(
    data: OrganizationModel
  ): Promise<OrganizationModel> {
    const createUserUseCase = container.resolve(CreateOrganizationUseCase);
    const token = await createUserUseCase.execute(data);
    return token;
  }
}
