import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { ICityRepository } from "../../repositories/ICityRepository";
import { City } from "../entities/City.entity";

export class CityRepository implements ICityRepository {
  private __repository: Repository<City>;

  constructor() {
    this.__repository = dbContext.getRepository(City);
  }

  async create(data: City): Promise<City> {
    const city = this.__repository.create(data);
    return await this.__repository.save(city);
  }

  async find(found: any): Promise<City[]> {
    return await this.__repository
      .createQueryBuilder("addresses")
      .where("city.state_id = :id", {
        id: found,
      })
      .getMany();
  }

  async findById(id: number): Promise<City> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }
}
