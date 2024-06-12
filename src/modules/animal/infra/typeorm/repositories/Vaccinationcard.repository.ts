import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IVaccinationCardRepository } from "../../repositories/IVaccinationCardRepository";
import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";
import { VaccinationCard } from "../entities/VaccinationCard.entity";

export class VaccinationCardRepository implements IVaccinationCardRepository {
  private __repository: Repository<VaccinationCard>;

  constructor() {
    this.__repository = dbContext.getRepository(VaccinationCard);
  }
  
  delete(data: IVaccinationCardDtos): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(data: IVaccinationCardDtos): Promise<VaccinationCard> {
    return await this.__repository.save(this.__repository.create(data))
  }

  findById(id: number): Promise<VaccinationCard> {
    throw new Error("Method not implemented.");
  }

}