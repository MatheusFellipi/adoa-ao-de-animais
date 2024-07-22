import { IUserDtos } from "@modules/user/dtos/IUserDtos";

export interface ILinkDtos {
  id?: string;
  name:string
  user?: IUserDtos;
  url: string;
}