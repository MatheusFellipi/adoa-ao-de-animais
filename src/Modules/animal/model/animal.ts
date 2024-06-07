import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  validate,
  ValidateIf,
} from "class-validator";

import { VaccinationCardModelView } from "./vaccinationCard";
import { AnimalGender, AnimalSize } from "../enum/animal.enum";
import { PhotoModelView } from "@modules/photos/model/photos";
import { AppError } from "@shared/infra/errors/AppError";
import { UserModalView } from "@modules/user/model/user";
import { OrganizationModelView } from "@modules/organization/model/organization";
import { SortOrder } from "../enum/query.enum";
import { Photo } from "@modules/photos/infra/typeorm/entities/photos.entity";

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

  @ValidateIf((o) => o.vaccinationCard !== undefined)
  vaccinationCard?: VaccinationCardModelView;

  @ValidateIf((o) => o.photos !== undefined)
  @IsArray()
  @IsUrl()
  photos?: Photo[];

  @ValidateIf((o) => o.organization !== undefined)
  @IsNotEmpty()
  organization?: OrganizationModelView;

  @ValidateIf((o) => o.user !== undefined)
  @IsNotEmpty()
  user?: UserModalView;

  static validate(data: AnimalModelView) {
    const instance = new AnimalModelView();
    Object.assign(instance, data);
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(
          errors
            .map((error) => Object.values(error.constraints))
            .join(", ")
            .toString(),
          401
        );
    });
    return data;
  }
}

export class AnimalPhotoModelView {
  animal_id?: number;
  photos: PhotoModelView[];

  static validade(data: AnimalPhotoModelView) {
    const instance = new AnimalPhotoModelView();
    Object.assign(instance, data);
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(
          errors
            .map((error) => Object.values(error.constraints))
            .join(", ")
            .toString(),
          401
        );
    });
    return data;
  }
}

export class AnimalQueryModel {
  @IsOptional()
  @IsInt()
  animal_id?: number;

  @IsOptional()
  @IsInt()
  account_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(AnimalSize)
  size?: AnimalSize;

  @IsOptional()
  @IsEnum(AnimalGender)
  gender?: AnimalGender;

  @IsOptional()
  @IsInt()
  organization_id?: number;

  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  microchip_code?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortOrder, { message: "Sort order must be either ASC or DESC" })
  sortOrder: SortOrder = 1;

  static validade(data: AnimalQueryModel) {
    const instance = new AnimalQueryModel();
    Object.assign(instance, data);
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(
          errors
            .map((error) => Object.values(error.constraints))
            .join(", ")
            .toString(),
          401
        );
    });
    return data;
  }
}
