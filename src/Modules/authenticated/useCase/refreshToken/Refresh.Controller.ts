import { container } from "tsyringe";
import { Request, Response } from "express";

import { RefreshTokenUseCase } from "./Refresh.UseCase";

export class RefreshTokenController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token = request.cookies.refresh_token;
    const createUserUseCase = container.resolve(RefreshTokenUseCase);
    const { data, refreshToken } = await createUserUseCase.execute(
      refresh_token
    );
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return response.status(200).json(data);
  }
}
