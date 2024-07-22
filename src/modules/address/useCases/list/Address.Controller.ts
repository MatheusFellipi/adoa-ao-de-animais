import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressUseCase } from "./Address.UseCase";

export class AddressListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    let { user_id } = request.query;
    const account = request.account;
    const address = container.resolve(AddressUseCase);

    if (!user_id) user_id = account.id;

    const data = await address.execute({
      user_id: user_id as string,
    });
    return response.status(200).json(data);
  }
}
