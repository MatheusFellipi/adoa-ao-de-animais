import { AppError } from "@shared/utils/errors/AppError";
import { IsNotEmpty, validate } from "class-validator";

export class VaccinationModel {
  id?: string;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  static async validade(data: VaccinationModel) {
    const instance = new VaccinationModel();
    Object.assign(instance, data)
    const errors = await validate(instance)
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    return instance
  }
}
 