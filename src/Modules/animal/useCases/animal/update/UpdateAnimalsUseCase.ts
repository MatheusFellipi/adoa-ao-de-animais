import { inject, injectable } from "tsyringe";

import { AnimalModelView } from "@modules/animal/modelView/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/infra/errors/AppError";

@injectable()
export class UpdateAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(form: AnimalModelView): Promise<Animal> {
    const instancia = AnimalModelView.validade(form);
    const animal = await this.__repository.findById(instancia.id)
    if (!animal) {
      throw new AppError("o animal nao exitem no banco de dados", 400)
    }
    return await this.__repository.update(animal, instancia);
  }
}