import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/modelView/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { CreateVaccinationCardController } from "../../vaccinationCard/create/CreateVaccinationCardController";

@injectable()
export class CreateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(form: AnimalModelView): Promise<Animal> {
    const instancia = AnimalModelView.validade(form);
    
    if (instancia.vaccinationCard) {
      const card = await CreateVaccinationCardController.handleInternal(instancia.vaccinationCard)
      instancia.vaccinationCard = card
  }

    const animal = await this.__repository.create(instancia);

    return animal
  }
}
