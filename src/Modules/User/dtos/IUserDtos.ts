import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";

export interface IUserDtos {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  addresses: IAddressDtos[];
}

