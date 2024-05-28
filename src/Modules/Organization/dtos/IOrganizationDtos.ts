import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";
import { OrganizationType } from "../entities/enums/organization.enum";
import { ILinkDtos } from "@modules/helper/contacts/dtos/ILinkDtos";
import { IContactDtos } from "@modules/helper/contacts/dtos/IContactDtos";

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

