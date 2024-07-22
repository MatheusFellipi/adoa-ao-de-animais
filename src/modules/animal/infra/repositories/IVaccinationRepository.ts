import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../typeorm/entities/Vaccination.entity";

export interface IVaccinationRepository {
  create(data: IVaccinationDtos): Promise<Vaccination>;
  findById(id: string): Promise<Vaccination>;
  findExist(found: string): Promise<Vaccination>
  delete(data: IVaccinationDtos): Promise<void>
}

