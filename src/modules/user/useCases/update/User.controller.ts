import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./User.useCase";

export class UpdateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, cnpj_cpf, operation_at, description, type } = request.body;
    const avatar = request?.file?.key;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const data = await updateUserUseCase.execute(
      {
        id: request.account.id,
        name,
        avatar,
        cnpj_cpf,
        operation_at,
        description,
        type,
      },
    );
    return response.status(200).json(data);
  }
}
