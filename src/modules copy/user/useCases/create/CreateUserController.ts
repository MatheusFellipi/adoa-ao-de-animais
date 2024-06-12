import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { UserModalView } from "@modules/user/model/user";

 export class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, addresses, animals, contacts, links } = request.body;
    const avatar = request?.file?.key;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const token = await createUserUseCase.execute({ name, avatar, addresses, animals, contacts, links });
    return response.status(200).json(token);
  }
  
  static async handleInternal(data: UserModalView): Promise<UserModalView> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const token = await createUserUseCase.execute(data);
    return token
  }
}

