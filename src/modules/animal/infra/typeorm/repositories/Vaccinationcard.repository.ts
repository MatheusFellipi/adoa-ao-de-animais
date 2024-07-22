import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { IVaccinationCardRepository } from "../../repositories/IVaccinationCardRepository";
import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";
import { VaccinationCard } from "../entities/VaccinationCard.entity";

export class VaccinationCardRepository implements IVaccinationCardRepository {
  private __repository: Repository<VaccinationCard>;

  constructor() {
    this.__repository = dbContext.getRepository(VaccinationCard);
  }

  async delete(data: IVaccinationCardDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async create(data: IVaccinationCardDtos): Promise<VaccinationCard> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async findById(id: string): Promise<VaccinationCard> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }
}
