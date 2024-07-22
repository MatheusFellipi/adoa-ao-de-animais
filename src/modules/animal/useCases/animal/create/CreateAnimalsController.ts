import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAnimalsUseCase } from "./CreateAnimalsUseCase";

export class CreateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight } = request.body;
    const account = request.account
    const createUserUseCase = container.resolve(CreateAnimalsUseCase);
    await createUserUseCase.execute(
      { age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight, user: account });
    return response.status(201).send()
  }
}

