import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../typeorm/entities/vaccination.entity";

export interface IVaccinationRepository {
  create(data: IVaccinationDtos): Promise<Vaccination>;
  createMulti(data: IVaccinationDtos[]): Promise<Vaccination[]>;
  findById(id: number): Promise<Vaccination>;
  findExist(found: string): Promise<Vaccination>;
}

