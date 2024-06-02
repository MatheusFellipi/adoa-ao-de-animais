import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IVaccinationCardRepository } from "../../repositories/IVaccinationCardRepository";
import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";
import { VaccinationCard } from "../entities/vaccinationCard.entity";

export class VaccinationCardRepository implements IVaccinationCardRepository {
  private __repository: Repository<VaccinationCard>;
  
  constructor() {
    this.__repository = dbContext.getRepository(VaccinationCard);
  }
  
  create(data: IVaccinationCardDtos): Promise<VaccinationCard> {
    throw new Error("Method not implemented.");
  }
  
  findById(id: number): Promise<VaccinationCard> {
    throw new Error("Method not implemented.");
  }

}