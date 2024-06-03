import { IsEmail, IsStrongPassword, validate } from "class-validator";
import { hash, compare } from "bcrypt";

import { AppError } from "@shared/infra/errors/AppError";


import { OrganizationModelView } from "@modules/organization/modelView/organization";
import { UserModalView } from "@modules/user/modelView/user";



export class AccountModelView {
  id?: number;

  @IsEmail()
  email: string;

  organization?: OrganizationModelView;

  user?: UserModalView;

  @IsStrongPassword()
  password: string;

  static validade(data: AccountModelView) {
    const instance = new AccountModelView();
    Object.assign(instance, data)
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

