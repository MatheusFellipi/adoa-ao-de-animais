import { IsNotEmpty, validate } from "class-validator";
import { VaccinationModel } from "./vaccination";

export class DoseModel {
  id?: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  vaccination_date: Date;

  @IsNotEmpty()
  crmv: string;
  
  @IsNotEmpty()
  vaccination: VaccinationModel;

  @IsNotEmpty()
  vaccination_card_id?: string;

  static async validade(data: DoseModel) {
    const instance = new DoseModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      const message = errors.map((error) => Object.values(error.constraints)).join(", ");
      throw new Error(message);
    }
    return instance;
  }
}
