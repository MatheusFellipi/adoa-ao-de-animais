import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const type = request.type;
    data[type].avatar = request?.file?.key;
    const createUserUseCase = container.resolve(CreateAccountUseCase);
    const { account, refreshToken } = await createUserUseCase.execute(
      { email: data.email, password: data.password, [type]: data[type] },
      type
    );
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return response.status(201).json(account);
  }
}
