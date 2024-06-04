import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const avatar = request?.file?.key;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const token = await updateUserUseCase.execute({name, avatar}, request.account.user);
    return response.status(200).json(token);
  }
}

