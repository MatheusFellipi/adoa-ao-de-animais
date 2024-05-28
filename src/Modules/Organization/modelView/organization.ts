import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, validate } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationType } from "../entities/enums/organization.enum";
import { IContactDtos } from "@modules/helper/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/helper/contacts/dtos/ILinkDtos";
import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";

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

  static validade(data: Partial<OrganizationModelView>) {
    const instance = new OrganizationModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }
}

