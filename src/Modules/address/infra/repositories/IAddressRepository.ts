import { IAddressDtos } from "../../dtos/IAddressDtos";
import { Address } from "../typeorm/entities/address.entity";

export interface IAddressRepository {
  create(data: IAddressDtos): Promise<Address>;
  createMulti(data: IAddressDtos[]): Promise<Address[]>;
  findById(id: number): Promise<Address>;
}

