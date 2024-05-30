import { IsArray, IsUrl, IsNotEmpty, validate, IsNotEmptyObject, ValidateIf } from "class-validator";
import { AddressModelView } from "@modules/address/modelView/address";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { AppError } from "@shared/infra/errors/AppError";

export class UserModalView {
  id?: number;

  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;
  
  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  links?: ILinkDtos[];
  
  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  contacts: IContactDtos[];
  
  @IsArray()
  @IsNotEmptyObject({}, { each: true })
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
