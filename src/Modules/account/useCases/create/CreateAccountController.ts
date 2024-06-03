import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, type, user } = request.body;

    const createUserUseCase = container.resolve(CreateAccountUseCase);
    const token = await createUserUseCase.execute({ email, password, user }, type);
    return response.status(201).json(token);
  }
}