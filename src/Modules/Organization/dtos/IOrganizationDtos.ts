import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { OrganizationType } from "../enums/organization.enum";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";

export interface IOrganizationDtos {
  id?: number;
  name: string;
  description?: string;
  email: string;
  type: OrganizationType;
  contacts?: IContactDtos[];
  links?: ILinkDtos[];
  addresses: IAddressDtos[];
  cnpj_cpf: string;
  operation_at: Date;
  created_at?: Date;
  update_at?: Date;
}

