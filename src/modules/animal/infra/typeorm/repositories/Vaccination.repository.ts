import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { IVaccinationRepository } from "../../repositories/IVaccinationRepository";
import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../entities/Vaccination.entity";

export class VaccinationRepository implements IVaccinationRepository {
  private __repository: Repository<Vaccination>;

  constructor() {
    this.__repository = dbContext.getRepository(Vaccination);
  }

  async create(data: IVaccinationDtos): Promise<Vaccination> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

  async findById(id: string): Promise<Vaccination> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }

  async findExist(found: string): Promise<Vaccination> {
    return await this.__repository.findOne({
      where: {
        name: found,
      },
    });
  }

  async delete(data: IVaccinationDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }
}
