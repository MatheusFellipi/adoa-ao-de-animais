import { container } from "tsyringe";
import { Request, Response } from "express";

import { LogoutUseCase } from "./Logout.UseCase";

export class LogoutController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const token = request.account.token
    const createUserUseCase = container.resolve(LogoutUseCase);
    await createUserUseCase.execute( token );
    return response.status(200).json({});
  }
}
