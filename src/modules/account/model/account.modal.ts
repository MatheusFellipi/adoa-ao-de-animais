import { IsArray, IsEmail, IsStrongPassword, validate, ValidateIf } from "class-validator";
import { hash, compare } from "bcrypt";

import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationModel } from "@modules/organization/model/organization";
import { UserModalView } from "@modules/user/model/user";

export class AccountModel {
  id?: number;

  @IsEmail()
  email: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsArray()
  organization?: OrganizationModel;

  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  user?: UserModalView;

  @IsStrongPassword()
  password: string;

  static validade(data: AccountModel) {
    const instance = new AccountModel();
    Object.assign(instance, data)
    instance.email.toLowerCase()
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 400);
    });
    return data
  }

  static async crypto_password(password: string): Promise<string> {
    return await hash(password, 8);
  }

  static async equals_password(password: string, password_db: string) {
    return await compare(password, password_db);
  }
}

