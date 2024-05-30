import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { ICityDtos } from "./ICityDtos";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface IAddressDtos {
  id?: number;
  street: string;
  postal_code: string;
  district: string;
  complement: string;
  city: ICityDtos;
  organization?: IOrganizationDtos,
  user?: IUserDtos,
  created_at?: Date;
  update_at?: Date;
}

