import { IsNotEmpty } from "class-validator";
import { VaccinationModelView } from "./vaccination";

export class RelationshipVaccinationModelView {
  id?: number;

  @IsNotEmpty()
  dose: string;

  @IsNotEmpty()
  vaccination_date: Date;

  @IsNotEmpty()
  crmv: string;
  
  @IsNotEmpty()
  vaccination: VaccinationModelView;
}
