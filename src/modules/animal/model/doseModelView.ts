import { IsNotEmpty, validate } from "class-validator";
import { VaccinationModelView } from "./vaccination";
import { AppError } from "@shared/utils/errors/AppError";
import { VaccinationCardModelView } from "./vaccinationCard";

export class DoseModelView {
  id?: string;

  @IsNotEmpty()
  dose: string;

  @IsNotEmpty()
  vaccination_date: Date;

  @IsNotEmpty()
  crmv: string;
  
  @IsNotEmpty()
  vaccination: VaccinationModelView;

  @IsNotEmpty()
  vaccinationCard: VaccinationCardModelView;

  static validade(data: DoseModelView) {
    const instance = new DoseModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}
