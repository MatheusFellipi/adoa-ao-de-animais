import { IsArray, IsUrl, IsNotEmpty, validate, IsNotEmptyObject, ValidateIf } from "class-validator";
import { AddressModelView } from "@modules/address/model/address";
import { AppError } from "@shared/infra/errors/AppError";
import { LinkModelView } from "@modules/contacts/model/link";
import { ContactModelView } from "@modules/contacts/model/contact";
import { AnimalModelView } from "@modules/animal/model/animal";

export class UserModalView {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  contacts: ContactModelView[];
  
  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  @ValidateIf((o) => o.links !== undefined)
  addresses: AddressModelView[];

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;
  
  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  links?: LinkModelView[];
  
  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  animals?: AnimalModelView[];

  static async validate(data: UserModalView) {
    const instance = new UserModalView();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    }
    return instance;
  }
}


export class UserUpdateModalView {
  
  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar: string;
  
  static async validate(data: UserUpdateModalView) {
    const instance = new UserUpdateModalView();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    }
    return instance;
  }
}
