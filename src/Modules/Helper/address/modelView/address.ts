import { IsNotEmpty, IsNotEmptyObject, Length } from "class-validator";
import { CityModelView } from "./city";

export class AddressModelView {
  @IsNotEmptyObject({
    nullable: false,
  })
  city: CityModelView;

  @IsNotEmpty({
    message: "O campo 'street' não pode ser vazio"
  })
  street: string;

  @IsNotEmpty({
    message: "O campo 'postal_code' não pode ser vazio"
  })
  postal_code: string;

  @IsNotEmpty({
    message: "O campo 'district' não pode ser vazio"
  })
  district: string;

  @Length(0, 1000, {
    message: "O campo 'complement' deve ter no máximo 1000 caracteres"
  })
  complement: string;

}
