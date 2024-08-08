import { inject, injectable } from "tsyringe";

import { AnimalModel } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";

@injectable()
export class CreateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository
  ) {}
  async execute(form: AnimalModel): Promise<Animal> {
    const instance = await AnimalModel.validate(form);
    return await this.__repository.create(instance);
  }
}
