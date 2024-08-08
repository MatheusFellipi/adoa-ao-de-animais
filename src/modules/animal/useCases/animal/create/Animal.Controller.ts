import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAnimalsUseCase } from "./Animal.UseCase";

export class CreateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, weight } = request.body;
    const account = request.account
    const createUserUseCase = container.resolve(CreateAnimalsUseCase);
    const animals = await createUserUseCase.execute({ age, gender, name, size, birthDate, description, microchipCode, origin, weight, user: account });
    return response.status(201).send(animals)
  }
}

