import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, validate, ValidateIf} from "class-validator";

import { AnimalGender, AnimalSize } from "../enum/animal.enum";
import { AppError } from "@shared/utils/errors/AppError";
import { UserModal } from "@modules/user/model/user";
import { SortOrderEnum } from "@shared/utils/enums/query.enum";

export class AnimalModel {
  id?: string;

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

  @ValidateIf((o) => o.user !== undefined)
  @IsNotEmpty()
  user?: UserModal;

  static async validate(data: AnimalModel) {
    const instance = new AnimalModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0)
      throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(),);
    return instance;
  }
}

export class AnimalQueryModel {
  @IsOptional()
  @IsInt()
  animal_id?: number;

  @IsOptional()
  @IsInt()
  user_id?: number;

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
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sort?: SortOrderEnum;

  static async validade(data: AnimalQueryModel) {
    const instance = new AnimalQueryModel();
    Object.assign(instance, data);
    const errors = await validate(instance)
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    return instance;
  }
}
