import { validate } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";
import { DoseModelView } from "./doseModelView";


export class VaccinationCardModelView {
  id?: number;
  
  dose: DoseModelView[];

  static validade(data: VaccinationCardModelView) {
    const instance = new VaccinationCardModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}
