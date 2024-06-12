import { inject, injectable } from "tsyringe";

import {
  AnimalModel,
  AnimalQueryModel,
} from "@modules/animal/model/animal";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";

@injectable()
export class ListAnimalsUseCase {
  constructor(
    @inject("IAnimalRepository") private __repository: IAnimalRepository
  ) {}

  async execute(query: AnimalQueryModel): Promise<AnimalModel[]> {
    const instance = AnimalQueryModel.validade(query);

    let criteria: any = {};

    if (instance.animal_id) criteria.id = instance.animal_id;
    if (instance.name) criteria.name = instance.name;
    if (instance.size) criteria.size = instance.size;
    if (instance.gender) criteria.gender = instance.gender;
    if (instance.organization_id)
      criteria.organization = { id: instance.organization_id };
    if (instance.user_id) criteria.user = { id: instance.user_id };
    if (instance.microchip_code)
      criteria.microchipCode = instance.microchip_code;

    return await this.__repository.find(criteria);
  }
}
