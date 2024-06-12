import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class DeleteAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(id_animal: number): Promise<void> {
    const animal = await this.__repository.findById(id_animal)
    if (!animal) {
      throw new AppError("o animal noa exitem no banco de dados", 400)
    }
    await this.__repository.delete(animal);
  }
}
