import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./Account.UseCase";

export class CreateAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, user} = request.body;
    if (user) user.avatar = request?.file?.key;
    const createUserUseCase = container.resolve(CreateAccountUseCase);
    const { account, refreshToken } = await createUserUseCase.execute({
      email,
      password,
      user,
    });
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return response.status(201).json(account);
  }
}
