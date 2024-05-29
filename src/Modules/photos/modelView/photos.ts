import { IsNotEmpty } from "class-validator";

export class PhotoModelView {
  id?: number;
  
  @IsNotEmpty()
  url: string;
}
