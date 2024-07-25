import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListAccountUseCase } from "./Account.UseCase";


export class ListAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const account = request.account
    const createUserUseCase = container.resolve(ListAccountUseCase);
    const token = await createUserUseCase.execute(account.account_id);
    return response.status(200).json(token);
  }
}