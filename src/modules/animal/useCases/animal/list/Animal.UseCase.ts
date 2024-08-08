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

    let query: any = {};

    if (instance.animal_id) query.id = instance.animal_id;
    if (instance.name) query.name = instance.name;
    if (instance.size) query.size = instance.size;
    if (instance.gender) query.gender = instance.gender;
    if (instance.user_id) query.user = { id: instance.user_id };

    return await this.__repository.find(query);
  }
}
