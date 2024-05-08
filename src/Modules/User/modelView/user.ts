import { AddressModelView } from "@modules/helper/address/modelView/address";
import { IsArray, IsEmail, IsNotEmpty } from "class-validator";

export class UserModelView {
  id?: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  avatar?: string;
  
  links?: Object[];
  
  contacts?: Object[];
  
  @IsArray()
  addresses: AddressModelView[];
  
  animals?: object[];
}
