import { IsNotEmpty, validate } from "class-validator";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { AppError } from "@shared/infra/errors/AppError";
import { AnimalModel } from "@modules/animal/model/animal";

export class AnimalAdNModel {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: AnimalAdType;

  @IsNotEmpty()
  animal: AnimalModel;

  static validade(data: AnimalAdNModel) {
    const instance = new AnimalAdNModel();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}
