import { IsNotEmpty } from "class-validator";

export class VaccinationModelView {
  id?: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
