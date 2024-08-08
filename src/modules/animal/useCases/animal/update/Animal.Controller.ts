import { container } from "tsyringe";
import { Request, Response } from "express";

import { UpdateAnimalsUseCase } from "./Animal.UseCase";


export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, weight } = request.body;
    const { id } = request.params
    const createUserUseCase = container.resolve(UpdateAnimalsUseCase);
    const animal = await createUserUseCase.execute(
      { id, age, gender, name, size, birthDate, description, microchipCode, origin, weight }
    );
    return response.status(200).json(animal)
  }
}

