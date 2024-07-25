import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./Account.UseCase";

export class CreateAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, user} = request.body;
    if (user) user.avatar = request?.file?.key;
    const createUserUseCase = container.resolve(CreateAccountUseCase);
    const data  = await createUserUseCase.execute({
      email,
      password,
      user,
    });
    return response.status(201).json(data);
  }
}
