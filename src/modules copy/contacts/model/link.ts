import { UserModalView } from "@modules/user/model/user";
import { OrganizationModel } from "@modules/organization/model/organization";
import { IsNotEmpty, validate, ValidateIf } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";

export class LinkModel {
  @ValidateIf(c=>c.id!== undefined)
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  url: string;

  organization?: OrganizationModel;
  
  user?: UserModalView;

  static validade(data: LinkModel) {
    const instance = new LinkModel();
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
