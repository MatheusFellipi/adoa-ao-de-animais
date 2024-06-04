import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateAnimalsUseCase } from "./UpdateAnimalsUseCase";


export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight } = request.body;
    const createUserUseCase = container.resolve(UpdateAnimalsUseCase);
    await createUserUseCase.execute({ age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight });
    return response.status(201).send()
  }
}

