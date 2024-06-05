import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";


export interface IUserDtos {
  id?: number;
  name: string;
  avatar?: string;
  addresses: IAddressDtos[];
  contacts: IContactDtos[],
  links?: ILinkDtos[]
}

export interface IUserUpdateDtos {
  id?: number;
  name: string;
  avatar?: string;
}

