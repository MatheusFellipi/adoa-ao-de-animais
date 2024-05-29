import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateOrganizationUseCase } from "./CreateOrganizationUseCase";

export class CreateOrganizationController {
 static  async handle(request: Request, response: Response): Promise<Response> {
    const { addresses, cnpj_cpf, email, name, operation_at, type, contacts, description, links } = request.body;
    const createUserUseCase = container.resolve(CreateOrganizationUseCase);
    const token = await createUserUseCase.execute({
      addresses, cnpj_cpf, email, name, operation_at, type, contacts, description, links
    });
    return response.status(200).json(token);
  }
}

