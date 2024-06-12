import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressUseCase } from "./Address.UseCase";

export class AddressUseCaseController {
 static async handle(request: Request, response: Response): Promise<Response> {
    const { city, street, postal_code, district, complement } = request.body;
    const account = request.account[request.type]
    const authenticateUserUseCase = container.resolve(AddressUseCase);
    const token = await authenticateUserUseCase.execute({
      city, street, postal_code, district, complement, [request.type]: account
    });
    return response.status(200).json(token);
  }
}
