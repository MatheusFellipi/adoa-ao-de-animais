import { IVaccinationDtos } from "./IVaccinationDtos";


export interface IDoseDtos {
  id?: string;
  dose: string;
  crmv: string;
  vaccination_date: Date;
  vaccination?: IVaccinationDtos;
}

