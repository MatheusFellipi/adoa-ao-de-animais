import { AppError } from "@shared/utils/errors/AppError";
import { IsNotEmpty, validate } from "class-validator";

export class VaccinationModelView {
  id?: number;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  static validade(data: VaccinationModelView) {
    const instance = new VaccinationModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}
 