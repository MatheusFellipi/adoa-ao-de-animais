import { IAddressRepository } from "../IAddressRepository";
import { Address } from "../../typeorm/entities/address.entity";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";


export class AddressRepositoryInMemory implements IAddressRepository {
  private _addresses: Address[] = [];
  async create({street, district, complement, city, postal_code}: IAddressDtos): Promise<Address> {
    const addresses = new Address();
    Object.assign(addresses, { street, district, complement, city, postal_code });
    this._addresses.push(addresses);
    return addresses
  }
  async findById(id: number): Promise<Address> {
    return this._addresses.find((address) => address.id === id );
  }
}
