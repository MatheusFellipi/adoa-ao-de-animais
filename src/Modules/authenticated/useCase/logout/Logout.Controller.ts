import { container } from "tsyringe";
import { Request, Response } from "express";

import { LogoutUseCase } from "./Logout.UseCase";

export class LogoutController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token = request.cookies.refresh_token;
    const createUserUseCase = container.resolve(LogoutUseCase);
    await createUserUseCase.execute(
      refresh_token
    );
    response.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return response.status(200).json({});
  }
}
