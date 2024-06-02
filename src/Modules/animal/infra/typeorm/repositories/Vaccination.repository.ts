import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { VaccinationCard } from "../entities/vaccinationCard.entity";
import { IVaccinationRepository } from "../../repositories/IVaccinationRepository";
import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../entities/vaccination.entity";

export class VaccinationRepository implements IVaccinationRepository {
  private __repository: Repository<VaccinationCard>;
  
  constructor() {
    this.__repository = dbContext.getRepository(VaccinationCard);
  }
  create(data: IVaccinationDtos): Promise<Vaccination> {
    throw new Error("Method not implemented.");
  }
  createMulti(data: IVaccinationDtos[]): Promise<Vaccination[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Vaccination> {
    throw new Error("Method not implemented.");
  }
  findExist(found: string): Promise<Vaccination> {
    throw new Error("Method not implemented.");
  }
}