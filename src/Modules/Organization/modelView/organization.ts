import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, IsUrl, validate, ValidateIf } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationType } from "../enums/organization.enum";
import { AddressModelView } from "@modules/address/modelView/address";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { LinkModelView } from "@modules/contacts/modelView/link";
import { ContactModelView } from "@modules/contacts/modelView/contact";
import { PhotoModelView } from "@modules/photos/modelView/photos";
import { Photo } from "@modules/photos/infra/typeorm/entities/photos.entity";

export class OrganizationModelView {
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

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  contacts?: ContactModelView[];

  @ValidateIf((o) => o.animals !== undefined)
  @IsArray()
  links?: LinkModelView[];

  @ValidateIf((o) => o.photos !== undefined)
  @IsArray()
  @IsUrl()
  photos?: Photo[];

  @IsArray()
  @IsNotEmptyObject({}, { each: true })
  addresses: AddressModelView[];

  static validade(data: OrganizationModelView) {
    const instance = new OrganizationModelView();
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

