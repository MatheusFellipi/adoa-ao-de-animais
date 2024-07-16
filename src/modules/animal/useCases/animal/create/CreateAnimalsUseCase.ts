import { inject, injectable } from "tsyringe";

import { AnimalModel } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { CreateVaccinationCardController } from "../../vaccinationCard/create/CreateVaccinationCardController";

@injectable()
export class CreateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(form: AnimalModel): Promise<Animal> {
    const instance = AnimalModel.validate(form);
    
    if (instance.vaccinationCard) {
      const card = await CreateVaccinationCardController.handleInternal(instance.vaccinationCard)
      instance.vaccinationCard = card
  }

    const animal = await this.__repository.create(instance);

    return animal
  }
}
