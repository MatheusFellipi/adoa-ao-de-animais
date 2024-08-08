import { validate } from "class-validator";
import { AppError } from "@shared/utils/errors/AppError";
import { DoseModelView } from "./doseModelView";


export class VaccinationCardModel {
  id?: string;
  
  dose: DoseModelView[];

  static async validade(data: VaccinationCardModel) {
    const instance = new VaccinationCardModel();
    Object.assign(instance, data)
    const errors = await validate(instance)
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    return instance
  }
}
