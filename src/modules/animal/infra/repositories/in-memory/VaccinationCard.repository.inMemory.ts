import { IVaccinationCardRepository } from "../IVaccinationCardRepository";
import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";
import { VaccinationCard } from "../../typeorm/entities/VaccinationCard.entity";

export class VaccinationCardRepositoryInMemory implements IVaccinationCardRepository {
  private _vaccinationCards: VaccinationCard[] = [];

  async create(data: IVaccinationCardDtos): Promise<VaccinationCard> {
    const vaccinationCard = new VaccinationCard();
    Object.assign(vaccinationCard, data);
    this._vaccinationCards.push(vaccinationCard);
    return vaccinationCard;
  }

  async findById(id: string): Promise<VaccinationCard> {
    return this._vaccinationCards.find((card) => card.id === id);
  }

  async delete(data: IVaccinationCardDtos): Promise<void> {
    this._vaccinationCards = this._vaccinationCards.filter((card) => card.id !== data.id);
  }
}
