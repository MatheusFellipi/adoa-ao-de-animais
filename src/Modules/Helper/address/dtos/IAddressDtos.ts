import { ICityDtos } from "./ICityDtos";

export interface IAddressDtos {
  id?: number;
  street: string;
  postal_code: string;
  district: string;
  complement: string;
  city: ICityDtos;
  created_at?: Date;
  update_at?: Date;
}

