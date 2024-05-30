import { IsArray, IsUrl, IsNotEmpty, validate } from "class-validator";

import { AddressModelView } from "@modules/address/modelView/address";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { AppError } from "@shared/infra/errors/AppError";

export class UserModalView {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsUrl()
  avatar?: string;
  
  @IsArray()
  links?: ILinkDtos[];
  
  @IsArray()
  contacts: IContactDtos[];
  
  @IsArray()
  addresses: AddressModelView[];

  @IsArray()
  animals?: object[];

  static validade(data: UserModalView) {
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
