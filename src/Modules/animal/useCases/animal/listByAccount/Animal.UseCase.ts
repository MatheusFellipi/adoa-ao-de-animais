import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class ListAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(account_id: number): Promise<AnimalModelView[]> {
    return await this.__repository.listAllByAccount(account_id);
  }
}
