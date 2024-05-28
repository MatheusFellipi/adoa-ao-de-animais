import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface ILinkDtos {
  id?: number;
  user?: IUserDtos;
  organization?: Organization;
  link: string;
}