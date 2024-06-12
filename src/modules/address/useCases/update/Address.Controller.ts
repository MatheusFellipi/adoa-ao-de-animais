import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAddressUseCase } from "./Address.UseCase";

export class UpdateAddressController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { city, street, postal_code, district, complement } = request.body;
    const { id } = request.params
    const type = request.type
    const account = request.account[type]
    const authenticateUserUseCase = container.resolve(UpdateAddressUseCase);
    const token = await authenticateUserUseCase.execute({
      id: parseInt(id), city, street, postal_code, district, complement, [type]: account
    }, type);
    return response.status(200).json(token);
  }
}
