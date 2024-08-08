import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAnimalsUseCase } from "./Animal.UseCase";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";

export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    let { animal_id, name, size, gender, user_id, page, limit, sort } =
      request.params;

    const account = request.account;
    if (!user_id) user_id = account.id;

    const createUserUseCase = container.resolve(ListAnimalsUseCase);

    const animal = await createUserUseCase.execute({
      animal_id: parseInt(animal_id),
      user_id: parseInt(user_id),
      name,
      size: parseInt(size),
      gender: parseInt(gender),
      sort: SortOrderEnum[sort ?? "ASC"],
      page: parseInt(page),
      limit: parseInt(limit),
    });
    return response.status(201).json(animal);
  }
}
