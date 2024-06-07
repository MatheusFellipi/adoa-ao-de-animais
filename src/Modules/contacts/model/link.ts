import { UserModalView } from "@modules/user/model/user";
import { OrganizationModelView } from "@modules/organization/model/organization";
import { IsNotEmpty, validate, ValidateIf } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";

export class LinkModelView {
  @ValidateIf(c=>c.id!== undefined)
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  url: string;

  created_at?: Date;
  updated_at?: Date;
  organization?: OrganizationModelView;
  user?: UserModalView;

  static validade(data: LinkModelView) {
    const instance = new LinkModelView();
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
