import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  validate,
} from "class-validator";

import { AppError } from "@shared/utils/errors/AppError";
import { compare } from "bcrypt";

export class AuthenticatedModel {
  @IsEmail()
  @IsNotEmpty({ message: "O email não pode estar vazio" })
  @MinLength(6)
  email: string;

  @IsStrongPassword(undefined, { message: "A senha não é forte o suficiente" })
  @IsNotEmpty({ message: "A senha não pode estar vazia" })
  @MinLength(8)
  password: string;

  static async validade(data: AuthenticatedModel) {
    const instance = new AuthenticatedModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new AppError(
        errors
          .map((error) => Object.values(error.constraints))
          .join(", ")
          .toString()
      );
    }
    instance.email.toLowerCase()
    return instance;
  }

  static async equals_password(password: string, password_db: string) {
    return await compare(password, password_db);
  }
}
