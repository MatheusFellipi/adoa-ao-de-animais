import { VaccinationCard } from "../typeorm/entities/VaccinationCard.entity";
import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";

export interface IVaccinationCardRepository {
  create(data: IVaccinationCardDtos): Promise<VaccinationCard>;
  findById(id: number): Promise<VaccinationCard>;
  delete(data: IVaccinationCardDtos): Promise<void>
}

