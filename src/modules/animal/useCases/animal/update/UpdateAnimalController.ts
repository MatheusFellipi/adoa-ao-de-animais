import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateAnimalsUseCase } from "./UpdateAnimalsUseCase";


export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, photos, weight } = request.body;
    const { id } = request.params
    const createUserUseCase = container.resolve(UpdateAnimalsUseCase);
    const animal = await createUserUseCase.execute(
      { id, age, gender, name, size, birthDate, description, microchipCode, origin, photos, weight }
    );
    return response.status(201).json(animal)
  }
}

