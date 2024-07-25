import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteAccountUseCase } from "./Account.UseCase";

export class DeleteAccountController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const account = request.account
    const useCase = container.resolve(DeleteAccountUseCase);
    const token = await useCase.execute(account.account_id);
    return response.status(200).json(token);
  }
}
