import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressUseCase } from "./Address.UseCase";

export class AddressListController {
  static async handle(request: Request, response: Response): Promise<Response> {
    let { user_id, organization_id } = request.query;
    const account = request.account[request.type];
    const authenticateUserUseCase = container.resolve(AddressUseCase);
    
    if (!user_id && request.type === "user") user_id = account.id;
    else if (!organization_id && request.type === "organization") organization_id = account.id;

    const token = await authenticateUserUseCase.execute({
      user_id: parseInt(user_id as string),
      organization_id: parseInt(organization_id as string),
    });
    return response.status(200).json(token);
  }
}
