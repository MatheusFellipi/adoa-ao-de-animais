import { VaccinationCardModelView } from "./vaccinationCard";
import { AnimalGender, AnimalSize } from "../enum/animal.enum";
import { IsArray, IsNotEmpty, validate, ValidateIf } from "class-validator";
import { PhotoModelView } from "@modules/photos/modelView/photos";
import { AppError } from "@shared/infra/errors/AppError";
import { UserModalView } from "@modules/user/modelView/user";
import { OrganizationModelView } from "@modules/organization/modelView/organization";

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

  @IsNotEmpty()
  age: string;

  microchipCode?: string;

  @ValidateIf((o) => o.links !== undefined)
  vaccinationCard?: VaccinationCardModelView;

  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  photos?: PhotoModelView[];

  organization?: OrganizationModelView;
  user?: UserModalView;

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