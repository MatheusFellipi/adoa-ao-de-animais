import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAnimalsUseCase } from "./Animal.UseCase";

export class ListAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    let { animal_id, name, size, gender, user_id, page, limit, sort } =
      request.params;

    const account = request.account;
    if (!user_id) user_id = account.id;

    const createUserUseCase = container.resolve(ListAnimalsUseCase);
    const animal = await createUserUseCase.execute({
      animal_id: animal_id,
      user_id: user_id,
      name,
      size: size ? parseInt(size) : undefined,
      gender: gender ? parseInt(gender) : undefined,
      sort: sort,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });
    return response.status(200).json(animal);
  }
}
