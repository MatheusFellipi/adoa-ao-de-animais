import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IVaccinationRepository } from "../../repositories/IVaccinationRepository";
import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../entities/vaccination.entity";

export class VaccinationRepository implements IVaccinationRepository {
  private __repository: Repository<Vaccination>;

  constructor() {
    this.__repository = dbContext.getRepository(Vaccination);
  }
  async create(data: IVaccinationDtos): Promise<Vaccination> {
    return await this.__repository.save(this.__repository.create(data))
  }

  findById(id: number): Promise<Vaccination> {
    throw new Error("Method not implemented.");
  }

  findExist(found: string): Promise<Vaccination> {
    return this.__repository.findOne({
      where: {
        name: found
      }
    })
  }
}