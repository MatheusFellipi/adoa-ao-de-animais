import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, validate } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationType } from "../enums/organization.enum";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";
import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { AddressModelView } from "@modules/address/modelView/address";

export class OrganizationModelView {
  id?: number;

  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  type: OrganizationType;

  @IsArray()
  contacts?: IContactDtos[];

  @IsArray()
  links?: ILinkDtos[];

  @IsArray()
  @IsNotEmptyObject()
  addresses: IAddressDtos[];

  @IsNotEmpty()
  cnpj_cpf: string;

  @IsNotEmpty()
  @IsDate()
  operation_at: Date;

  static validade(data: OrganizationModelView) {
    const instance = new OrganizationModelView();
    data.addresses.forEach(element => AddressModelView.validade(element));
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}

