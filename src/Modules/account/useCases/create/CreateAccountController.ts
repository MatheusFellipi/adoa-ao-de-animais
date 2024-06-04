import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const type = request.type
    data[type].avatar = request.file.key

    const createUserUseCase = container.resolve(CreateAccountUseCase);
    const token = await createUserUseCase.execute({ email: data.email, password: data.password, [type]: data[type] }, type);
    return response.status(201).json(token);
  }
}