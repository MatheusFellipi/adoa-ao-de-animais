import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAnimalsUseCase } from "./Animal.UseCase";


export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(ListAnimalsUseCase);
    const type = request.type
    const account = request.account[type]
    const animal = await createUserUseCase.execute(
      account[type].id
    );
    return response.status(201).json(animal)
  }
}

