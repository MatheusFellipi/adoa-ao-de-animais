import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";

export interface IUserDtos {
  id?: string;
  name: string;
  avatar?: string;
  description?: string;
  type: number;
  cnpj_cpf: string;
  operation_at?: Date;
  addresses: IAddressDtos[];
  contacts: IContactDtos[];
  links?: ILinkDtos[];
}

export interface IUserUpdateDtos {
  id?: string;
  name: string;
  avatar?: string;
  description?: string;
  type: number;
  cnpj_cpf: string;
  operation_at?: Date;
}
