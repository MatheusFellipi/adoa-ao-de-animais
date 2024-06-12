import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAnimalsUseCase } from "./Animal.UseCase";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";

export class UpdateAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { animal_id, name, size, gender, organization_id, user_id, microchip_code, page, limit, sortField, sortOrder,
    } = request.params;

    const type = request.type;
    const account = request.account[type];
    let account_id = organization_id ?? user_id;

    if (organization_id && user_id) account_id = account[type].id;

    const createUserUseCase = container.resolve(ListAnimalsUseCase);

    const animal = await createUserUseCase.execute({
      animal_id: parseInt(animal_id),
      name,
      account_id: parseInt(account_id),
      size: parseInt(size),
      gender: parseInt(gender),
      organization_id: parseInt(organization_id),
      user_id: parseInt(user_id),
      microchip_code,
      page: parseInt(page),
      limit: parseInt(limit),
      sortField,
      sortOrder: parseInt(sortOrder),
    });
    return response.status(201).json(animal);
  }
}
