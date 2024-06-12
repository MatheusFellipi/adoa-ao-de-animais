import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { Animal } from "../entities/Animal.entity";
import { IAnimalRepository } from "../../repositories/IAnimalRepository";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export class AnimalRepository implements IAnimalRepository {
  private __repository: Repository<Animal>;
  constructor() {
    this.__repository = dbContext.getRepository(Animal);
  }
  
  find(criteria: object): Promise<Animal[]> {
    throw new Error("Method not implemented.");
  }

  listAllByAccount(account_id: number): Promise<Animal[]> {
    throw new Error("Method not implemented.");
  }

  async create(data: IAnimalDtos): Promise<Animal> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

  async update(data: Animal, change_data: IAnimalDtos): Promise<Animal> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }

  async delete(data: Animal): Promise<void> {
    await this.__repository.delete(data);
  }

  async findById(id: number): Promise<Animal> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }

  async findByIdFullReturn(id: number): Promise<Animal> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { vaccinationCard: true },
    });
  }
}
