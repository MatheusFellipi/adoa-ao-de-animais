import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { Animal } from "../entities/Animal.entity";
import { IAnimalRepository } from "../../repositories/IAnimalRepository";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";
import { AnimalQueryModel } from "@modules/animal/model/animal";

export class AnimalRepository implements IAnimalRepository {
  private __repository: Repository<Animal>;
  
  constructor() {
    this.__repository = dbContext.getRepository(Animal);
  }

  async findQuery(params: AnimalQueryModel): Promise<Animal[]> {
    const { animal_id, name, size, gender, user_id, sort } = params;
    const query = this.__repository.createQueryBuilder("animal");
    if (animal_id)
      query.orWhere("animal.animal_id = :animal_id", { animal_id });
    if (name) query.orWhere("animal.name LIKE :name", { name: `%${name}%` });
    if (size) query.orWhere("animal.size = :size", { size });
    if (gender) query.orWhere("animal.gender = :gender", { gender });
    if (user_id) query.orWhere("animal.user_id = :user_id", { user_id });
    if (sort) {
      const [field, order] = sort.split(":");
      query.orderBy(
        `animal.${field}`,
        order.toUpperCase() === "DESC" ? "DESC" : "ASC"
      );
    }
    return await query.getMany();
  }

  async findByUser(user_id: string): Promise<Animal[]> {
    return await this.__repository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }

  async create(data: IAnimalDtos): Promise<Animal> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async update(data: Animal, change_data: IAnimalDtos): Promise<Animal> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }

  async delete(data: Animal): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async findById(id: string): Promise<Animal> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{
        vaccinationCard:true
      }
    });
  }
}
