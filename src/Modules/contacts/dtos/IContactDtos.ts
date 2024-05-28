import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface IContactDtos {
  id?: number;
  user?: IUserDtos;
  organization?: IOrganizationDtos;
  link: string;
}