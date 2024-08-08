import { inject, injectable } from "tsyringe";

import { AnimalModel, AnimalQueryModel } from "@modules/animal/model/animal";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";

@injectable()
export class ListAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository
  ) {}

  async execute(form: AnimalQueryModel): Promise<AnimalModel[]> {
    const instance = await AnimalQueryModel.validade(form);
    return await this.__repository.findQuery(instance);
  }
}
