import { IsNotEmpty, IsNumber } from "class-validator";

export class CityModelView {
  @IsNotEmpty({
    message: "O id nao pode ser vazio e tem que ser numero"
  })
  @IsNumber()
  id: number

  @IsNotEmpty({
    message: "O id nao pode ser vazio"
  })
  name: string;

}
