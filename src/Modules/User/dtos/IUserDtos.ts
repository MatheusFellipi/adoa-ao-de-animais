import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";
import { IContactDtos } from "@modules/helper/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/helper/contacts/dtos/ILinkDtos";

export interface IUserDtos {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  addresses: IAddressDtos[];
  contacts?: IContactDtos[],
  links?: ILinkDtos[]
  animals?: object[];
}

