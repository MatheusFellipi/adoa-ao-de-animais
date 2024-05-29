import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { Animal } from "../entities/animal.entity";
import { IAnimalRepository } from "../../repositories/IAnimalRepository";
import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";

export class OrganizationRepository implements IAnimalRepository {
  private __repository: Repository<Animal>;

  constructor() {
    this.__repository = dbContext.getRepository(Animal);
  }

  async create(data: IOrganizationDtos): Promise<Animal> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

  async findById(id: number): Promise<Animal> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { vaccinationCard: true }
    });
  }
}