import { UserModal } from "@modules/user/model/user";
import { AppError } from "@shared/utils/errors/AppError";
import { IsNotEmpty, validate } from "class-validator";
import { ContactType } from "../enum/contact.enum";

export class ContactModel {
  id?: string;

  @IsNotEmpty()
  type: ContactType;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  user?: UserModal;

  static async validade(data: ContactModel) {
    const instance = new ContactModel();
    Object.assign(instance, data);
    const errors = await validate(instance);
    if (errors.length > 0)
      throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString());
    return data;
  }
}
