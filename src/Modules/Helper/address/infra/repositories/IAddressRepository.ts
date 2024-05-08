import { IAddressDtos } from "../../dtos/IAddressDtos";
import { Address } from "../typeorm/entities/address.entity";

export interface IAddressRepository {
  create(data: IAddressDtos): Promise<void>;
  findById(id: number): Promise<Address>;
}

