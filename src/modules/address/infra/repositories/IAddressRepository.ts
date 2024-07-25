import { IAddressDtos } from "../../dtos/IAddressDtos";
import { Address } from "../typeorm/entities/Address.entity";

export interface IAddressRepository {
  create(data: IAddressDtos): Promise<Address>;
  update(address: Address, change_data: IAddressDtos): Promise<Address>;
  delete(address: IAddressDtos): Promise<void>;
  deleteByUser(userId: string[]): Promise<void>;
  find(found: any): Promise<Address[]>;
  createMulti(data: IAddressDtos[]): Promise<Address[]>;
  findById(id: string): Promise<Address>;
}

