import { IsArray, IsEmail, IsStrongPassword, validate, ValidateIf } from "class-validator";
import { hash, compare } from "bcrypt";

import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationModelView } from "@modules/organization/model/organization";
import { UserModalView } from "@modules/user/model/user";



export class AccountModelView {
  id?: number;

  @IsEmail()
  email: string;

  @ValidateIf((o) => o.avatar !== undefined)
  @IsArray()
  organization?: OrganizationModelView;

  @ValidateIf((o) => o.links !== undefined)
  @IsArray()
  user?: UserModalView;

  @IsStrongPassword()
  password: string;

  token?: string | any[];

  static validade(data: AccountModelView) {
    const instance = new AccountModelView();
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

