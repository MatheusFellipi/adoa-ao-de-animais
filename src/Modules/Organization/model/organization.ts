import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, IsUrl, validate, ValidateIf } from "class-validator";

import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationType } from "../enums/organization.enum";
import { AddressModelView } from "@modules/address/model/address";
import { LinkModelView } from "@modules/contacts/model/link";
import { ContactModel } from "@modules/contacts/model/contact";

import { Photo } from "@modules/photos/infra/typeorm/entities/photos.entity";

export class OrganizationModel {
  id?: number;

  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;

  description?: string;

  @IsNotEmpty()
  type: OrganizationType;

  @IsNotEmpty()
  cnpj_cpf: string;

  @IsNotEmpty()
  @IsDate()
  operation_at: Date;

  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  contacts?: ContactModel[];

  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  links?: LinkModelView[];

  @ValidateIf((o) => o.photos !== undefined)
  @IsArray()
  @IsUrl()
  photos?: Photo[];

  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  addresses: AddressModelView[];

  static validade(data: OrganizationModel) {
    const instance = new OrganizationModel();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}

export class OrganizationUpdateModelView {
  id?: number;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  name?: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  avatar?: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  description?: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  type: OrganizationType | string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  cnpj_cpf: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsNotEmpty()
  @IsDate()
  operation_at: Date;

  static validade(data: OrganizationUpdateModelView) {
    const instance = new OrganizationUpdateModelView();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }
}

