import { IsNotEmpty, validate } from "class-validator";
import { AppError } from "@shared/utils/errors/AppError";
import { DoseModel } from "./doseModelView";


export class VaccinationCardModel {
  id?: string;
  
  @IsNotEmpty()
  animal_id: string

  dose?: DoseModel[];

  static async validade(data: VaccinationCardModel) {
    const instance = new VaccinationCardModel();
    Object.assign(instance, data)
    const errors = await validate(instance)
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    return instance
  }
}
