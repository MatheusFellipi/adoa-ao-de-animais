import { inject, injectable } from "tsyringe";

import { AnimalPhotoModelView } from "@modules/animal/model/animal";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { CreatePhotosController } from "@modules/photos/useCases/create/CreatePhotosController";

@injectable()
export class CreatePhotosAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository,
  ) { }

  async execute(form: AnimalPhotoModelView): Promise<Animal> {
    const instancia = AnimalPhotoModelView.validade(form);
    const animal = await this.__repository.findById(instancia.animal_id)

    if (!animal) throw new AppError("O animal nao se encontra no banco de dados")
    animal.photos =  await CreatePhotosController.handleInternal({
      photos: instancia.photos,
      animal: animal
    }, "animal")

    return animal
  }
}
