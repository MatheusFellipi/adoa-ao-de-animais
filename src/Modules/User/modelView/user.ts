import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";
import { AddressModelView } from "@modules/helper/address/modelView/address";
import { IContactDtos } from "@modules/helper/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/helper/contacts/dtos/ILinkDtos";
import { AppError } from "@shared/infra/errors/AppError";
import { IsArray, IsEmail, IsNotEmpty, validate } from "class-validator";

export class UserModalView {
  id?: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  avatar?: string;
  
  @IsArray()
  links?: ILinkDtos[];
  
  @IsArray()
  contacts?: IContactDtos[];
  
  @IsArray()
  addresses: AddressModelView[];

  @IsArray()
  animals?: object[];

  static validade(data: Partial<UserModalView>) {
    const instance = new UserModalView();
    data.addresses.forEach(element => {
      AddressModelView.validade(element)
    });
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}
