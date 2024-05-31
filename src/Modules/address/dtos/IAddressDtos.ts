import { UserModalView } from "@modules/user/modelView/user";
import { ICityDtos } from "./ICityDtos";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface IAddressDtos {
  id?: number;
  city: ICityDtos;
  street: string;
  postal_code: string;
  district: string;
  complement: string;
  user?: IUserDtos | UserModalView | Object,
  created_at?: Date;
  update_at?: Date;
}

