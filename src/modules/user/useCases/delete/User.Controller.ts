import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./User.UseCase";

export class DeleteUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const account = request.account
    const updateUserUseCase = container.resolve(DeleteUserUseCase);
    const token = await updateUserUseCase.execute(account, id);
    return response.status(200).json(token);
  }
}
