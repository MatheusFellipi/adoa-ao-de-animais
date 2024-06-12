import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Min,
  validate,
} from "class-validator";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/infra/errors/AppError";
import { compare } from "bcrypt";

export class AuthenticatedModel {
  @IsEmail()
  @IsString()
  @Min(6)
  email: string;

  @IsStrongPassword()
  @IsString()
  @Min(8)
  password: string;

  static validade(data: AuthenticatedModel) {
    const instance = new AuthenticatedModel();
    Object.assign(instance, data);
    instance.email.toLowerCase();
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(
          errors
            .map((error) => Object.values(error.constraints))
            .join(", ")
            .toString(),
          400
        );
    });
    return data;
  }

  static async equals_password(password: string, password_db: string) {
    return await compare(password, password_db);
  }
}
