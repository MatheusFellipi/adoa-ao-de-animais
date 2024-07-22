import { IsNotEmpty, IsNotEmptyObject, Length, validate } from "class-validator";
import { CityModelView } from "./city";
import { AppError } from "@shared/utils/errors/AppError";
import { UserModal } from "@modules/user/model/user";

export class AddressModel {
  id?: number

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  district: string;

  @Length(0, 1000,)
  complement?: string;

  @IsNotEmptyObject()
  city: CityModelView;

  user: UserModal

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
