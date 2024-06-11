import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validate,
} from "class-validator";
import { AnimalAdType } from "../enums/animalAd.enum";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { SortOrderEnum } from "@shared/enums/query.enum";
import { AppError } from "@shared/infra/errors/AppError";

export class AdQueryModal {
  @IsOptional()
  @IsInt()
  account_id?: number;

  @IsOptional()
  @IsInt()
  organization_id?: number;

  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  ad_id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  type?: AnimalAdType;

  @IsOptional()
  @IsInt()
  size?: AnimalSize;

  @IsOptional()
  @IsInt()
  gender?: AnimalGender;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortOrderEnum, { message: "Sort order must be either ASC or DESC" })
  sortOrder?: SortOrderEnum = 1;

  static validade(data: AdQueryModal) {
    const instance = new AdQueryModal();
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
