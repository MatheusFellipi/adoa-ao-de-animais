import { IsNotEmpty, IsNotEmptyObject, Length, validate } from "class-validator";
import { CityModelView } from "./city";
import { AppError } from "@shared/utils/errors/AppError";
import { UserModal } from "@modules/user/model/user";
import { OrganizationModel } from "@modules/organization/model/organization";

export class AddressModel {
  id?: number

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  district: string;

  @Length(0, 1000,)
  complement: string;

  created_at?: Date

  updated_at?: Date

  @IsNotEmptyObject()
  city: CityModelView;

  user?: UserModal

  organization?: OrganizationModel

  static validade(data: AddressModel) {
    const instance = new AddressModel();
    Object.assign(instance, data)
    validate(this).then((errors) => {
      if (errors.length > 0)
        throw new AppError(errors.map((error) => Object.values(error.constraints)).join(", ").toString(), 401);
    });
    return data
  }

}
