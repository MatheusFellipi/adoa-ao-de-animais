import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validate,
} from "class-validator";
import { AnimalAdType } from "../enums/animalAd.enum";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";
import { AppError } from "@shared/utils/errors/AppError";

export class AdQueryModal {
  @IsOptional()
  @IsInt()
  account_id?: string;

  @IsOptional()
  @IsInt()
  ad_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

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

  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  sortOrder?: SortOrderEnum = SortOrderEnum["desc"];

  static validade(data: Partial<AdQueryModal>) {
    const instance = new AdQueryModal();
    Object.assign(instance, data);
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(
          errors
            .map((error) => Object.values(error.constraints))
            .join(", ")
            .toString()
        );
    });
    return data;
  }
}
