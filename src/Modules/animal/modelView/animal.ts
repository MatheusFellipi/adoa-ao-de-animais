import { VaccinationCardModelView } from "./vaccinationCard";
import { AnimalGender, AnimalSize } from "../enum/animal.enum";
import { IsNotEmpty, validate } from "class-validator";
import { PhotoModelView } from "@modules/photos/modelView/photos";
import { UserModalView } from "@modules/user/modelView/user";
import { AppError } from "@shared/infra/errors/AppError";

export class AnimalModelView {
  id?: number;

  @IsNotEmpty()
  name: string;

  description?: string;

  origin?: string;

  @IsNotEmpty()
  size: AnimalSize;

  @IsNotEmpty()
  gender: AnimalGender;

  weight?: string;

  birthDate?: Date;

  age: string;

  microchipCode?: string;

  vaccinationCard?: VaccinationCardModelView;

  photos?: PhotoModelView[];

  static validade(data: AnimalModelView) {
    const instance = new AnimalModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}