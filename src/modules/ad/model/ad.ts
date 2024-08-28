import { IsNotEmpty, validate } from "class-validator";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";
import { AppError } from "@shared/utils/errors/AppError";
import { AnimalModel } from "@modules/animal/model/animal";

export class AnimalAdNModel {
  id?: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: AnimalAdType;

  @IsNotEmpty()
  animal: AnimalModel;

  static async validade(data: AnimalAdNModel) {
    const instance = new AnimalAdNModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0)
      throw new AppError(
        errors
          .map((error) => Object.values(error.constraints))
          .join(", ")
          .toString(),
        400
      );
    return instance;
  }
}
