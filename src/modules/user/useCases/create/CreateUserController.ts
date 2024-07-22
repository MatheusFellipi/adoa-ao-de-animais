import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { UserModal } from "@modules/user/model/user";

 export class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, cnpj_cpf, type, description, operation_at, addresses, animals, contacts, links } = request.body;
    const avatar = request?.file?.key;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const token = await createUserUseCase.execute({ name, avatar, addresses, animals, contacts, links, cnpj_cpf, type, description, operation_at });
    return response.status(200).json(token);
  }
  
  static async handleInternal(data: UserModal): Promise<UserModal> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const token = await createUserUseCase.execute(data);
    return token
  }
}

