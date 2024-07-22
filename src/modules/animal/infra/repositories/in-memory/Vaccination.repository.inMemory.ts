import { IVaccinationRepository } from "../IVaccinationRepository";
import { IVaccinationDtos } from "@modules/animal/dtos/IVaccinationDtos";
import { Vaccination } from "../../typeorm/entities/Vaccination.entity";

export class VaccinationRepositoryInMemory implements IVaccinationRepository {
  private _vaccinations: Vaccination[] = [];

  async create(data: IVaccinationDtos): Promise<Vaccination> {
    const vaccination = new Vaccination();
    Object.assign(vaccination, data);
    this._vaccinations.push(vaccination);
    return vaccination;
  }

  async findById(id: string): Promise<Vaccination> {
    return this._vaccinations.find((vaccination) => vaccination.id === id);
  }

  async findExist(found: string): Promise<Vaccination> {
    return this._vaccinations.find((vaccination) => vaccination.name === found);
  }

  async delete(data: IVaccinationDtos): Promise<void> {
    this._vaccinations = this._vaccinations.filter(
      (vaccination) => vaccination.id !== data.id
    );
  }
}
