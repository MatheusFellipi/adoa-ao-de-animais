import { container } from "tsyringe";
import { Request, Response } from "express";

import { AuthenticatedAccountUseCase } from "./AuthenticatedAccountUseCase";

export class AuthenticatedAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserUseCase = container.resolve(AuthenticatedAccountUseCase);
    const token = await createUserUseCase.execute({ email, password });
    return response.status(201).json(token);
  }
}