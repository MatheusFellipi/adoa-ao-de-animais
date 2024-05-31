import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

 export class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, addresses, animals, contacts, links } = request.body;
    const avatar = request.file.filename;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const token = await createUserUseCase.execute({ name, avatar, addresses, animals, contacts, links });
    return response.status(200).json(token);
  }
}

