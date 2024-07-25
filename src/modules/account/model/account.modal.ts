import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsStrongPassword,
  validate,
} from "class-validator";
import { hash, compare } from "bcrypt";

import { AppError } from "@shared/utils/errors/AppError";

import { UserModal } from "@modules/user/model/user";

export class AccountModel {
  id?: string;

  @IsEmail(undefined,{ message: "O email deve ser um endereço de email válido" })
  @IsNotEmpty({ message: "O email não pode estar vazio" })
  email: string;

  @IsStrongPassword(undefined, { message: "A senha não é forte o suficiente" })
  @IsNotEmpty({ message: "A senha não pode estar vazia" })
  password: string;

  @IsNotEmptyObject(undefined,{ message: "O usuário não pode estar vazio" })
  user: UserModal;

  static async validade(data: AccountModel) {
    const instance = new AccountModel();
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

    return instance;
  }

  static async crypto_password(password: string): Promise<string> {
    return await hash(password, 8);
  }

  static async equals_password(password: string, password_db: string) {
    return await compare(password, password_db);
  }
}
