import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListAccountUseCase } from "./Account.UseCase";


export class ListAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const type = request.type
    const account = request.account[type]
    const createUserUseCase = container.resolve(ListAccountUseCase);
    const token = await createUserUseCase.execute(parseInt(account[type].id));
    return response.status(201).json(token);
  }
}