import {
  IsArray,
  IsUrl,
  IsNotEmpty,
  validate,
  IsNotEmptyObject,
  ValidateIf,
} from "class-validator";
import { AddressModel } from "@modules/address/model/address";
import { AppError } from "@shared/utils/errors/AppError";
import { LinkModel } from "@modules/contacts/model/link";
import { ContactModel } from "@modules/contacts/model/contact";
import { AnimalModel } from "@modules/animal/model/animal";

export class UserModal {
  id?: string;

  @IsNotEmpty()
  name: string;

  description?: string;

  type: number;

  cnpj_cpf: string;

  operation_at?: Date;

  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  contacts: ContactModel[];

  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  @ValidateIf((o) => o.links !== undefined)
  addresses: AddressModel[];

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;

  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  links?: LinkModel[];

  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  animals?: AnimalModel[];

  static async validate(data: UserModal) {
    const instance = new UserModal();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new AppError(
        errors
          .map((error) => Object.values(error.constraints))
          .join(", ")
          .toString()
      );
    }
    return instance;
  }
}

export class UserUpdateModal {
  id?: string;

  @IsNotEmpty()
  name: string;

  description?: string;

  type: number;

  cnpj_cpf: string;

  operation_at?: Date;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;

  static async validate(data: UserUpdateModal) {
    const instance = new UserUpdateModal();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new AppError(
        errors
          .map((error) => Object.values(error.constraints))
          .join(", ")
          .toString()
      );
    }
    return instance;
  }
}
