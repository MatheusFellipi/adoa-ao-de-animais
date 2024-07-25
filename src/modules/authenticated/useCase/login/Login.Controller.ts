import { container } from "tsyringe";
import { Request, Response } from "express";

import { LoginUseCase } from "./Login.UseCase";

export class LoginController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserUseCase = container.resolve(LoginUseCase);
    const data  = await createUserUseCase.execute({
      email,
      password,
    });
    return response.status(200).json(data);
  }
}
