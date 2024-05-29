import { IVaccinationDtos } from "./IVaccinationDtos";


export interface IRelationshipVaccinationDtos {
  id?: number;
  dose: string;
  crmv: string;
  vaccination_date: Date;
  vaccination: IVaccinationDtos;
}

