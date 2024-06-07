import { UserModalView } from "@modules/user/model/user";
import { OrganizationModelView } from "@modules/organization/model/organization";
import { AppError } from "@shared/infra/errors/AppError";
import { IsNotEmpty, validate } from "class-validator";
import { ContactType } from "../enum/contact.enum";

export class ContactModel {
  id?: number;

  @IsNotEmpty()
  type: ContactType;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  created_at?: Date;
  updated_at?: Date;
  organization?: OrganizationModelView;
  user?: UserModalView;

  static validade(data: ContactModel) {
    const instance = new ContactModel();
    Object.assign(instance, data);
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
}
