import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAnimalsUseCase } from "./CreateAnimalsUseCase";

export class CreateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight } = request.body;
    const type = request.type
    const account = request.account[type]
    const createUserUseCase = container.resolve(CreateAnimalsUseCase);
    await createUserUseCase.execute(
      { age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight, [type]: account });
    return response.status(201).send()
  }
}

