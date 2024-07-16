import { IsNotEmpty } from "class-validator";

export class CityModelView {
  id?: number

  @IsNotEmpty({
    message: "O id nao pode ser vazio"
  })
  name: string;

}
