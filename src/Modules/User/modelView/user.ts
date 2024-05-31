import { IsArray, IsUrl, IsNotEmpty, validate, IsNotEmptyObject, ValidateIf } from "class-validator";
import { AddressModelView } from "@modules/address/modelView/address";
import { AppError } from "@shared/infra/errors/AppError";
import { LinkModelView } from "@modules/contacts/modelView/link";
import { ContactModelView } from "@modules/contacts/modelView/contact";

export class UserModalView {
  id?: number;

  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;
  
  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  links?: LinkModelView[];
  
  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  contacts: ContactModelView[];
  
  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  @ValidateIf((o) => o.links !== undefined)
  addresses: AddressModelView[];

  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  animals?: object[];

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
