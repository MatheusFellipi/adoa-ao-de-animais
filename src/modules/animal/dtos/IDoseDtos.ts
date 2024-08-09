import { IVaccinationCardDtos } from "@modules/animal/dtos/IVaccinationCardDtos";
import { IVaccinationDtos } from "./IVaccinationDtos";


export interface IDoseDtos {
  id?: string;
  description: string;
  crmv: string;
  vaccination_date: Date;
  vaccination?: IVaccinationDtos;
  vaccinationCard?: IVaccinationCardDtos
}

