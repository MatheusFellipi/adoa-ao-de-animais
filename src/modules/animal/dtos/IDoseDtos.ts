import { IVaccinationDtos } from "./IVaccinationDtos";


export interface IDoseDtos {
  id?: number;
  dose: string;
  crmv: string;
  vaccination_date: Date;
  vaccination?: IVaccinationDtos;
}

