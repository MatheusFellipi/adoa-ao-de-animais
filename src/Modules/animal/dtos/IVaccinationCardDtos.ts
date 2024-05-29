import { IRelationshipVaccinationDtos } from "./IRelationshipVaccinationDtos";


export interface IVaccinationCardDtos {
  id?: number;
  vaccination: IRelationshipVaccinationDtos[];
}

