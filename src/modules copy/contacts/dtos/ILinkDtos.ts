import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface ILinkDtos {
  id?: number;
  user?: IUserDtos;
  organization?: IOrganizationDtos;
  url: string;
}