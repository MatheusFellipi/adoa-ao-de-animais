import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressUseCase } from "./AddressUseCase";

export class AddressUseCaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { city, street, postal_code, district, complement } = request.body;
    const authenticateUserUseCase = container.resolve(AddressUseCase);
    const token = await authenticateUserUseCase.execute({
      city, street, postal_code, district, complement
    });
    return response.status(200).json(token);
  }
}
