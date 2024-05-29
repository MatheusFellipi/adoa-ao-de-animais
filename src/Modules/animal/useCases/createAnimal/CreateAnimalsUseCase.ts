import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/modelView/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";

@injectable()
export class CreateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository
  ) { }
  async execute(data: AnimalModelView): Promise<Animal> {
    const animal = AnimalModelView.validade(data);
    return await this.__repository.create(animal);
  }
}
