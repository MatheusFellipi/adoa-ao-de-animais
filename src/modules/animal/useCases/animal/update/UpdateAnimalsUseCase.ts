import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class UpdateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(form: AnimalModelView): Promise<Animal> {
    const instance = AnimalModelView.validate(form);
    const animal = await this.__repository.findById(instance.id)

    if (!animal) {
      throw new AppError("o animal nâo existe no banco de dados", 400)
    }

    return await this.__repository.update(animal, instance);
  }
}
