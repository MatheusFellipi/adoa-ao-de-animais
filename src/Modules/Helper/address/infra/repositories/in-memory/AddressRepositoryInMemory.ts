import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";
import { IAddressRepository } from "../IAddressRepository";
import { Address } from "../../typeorm/entities/address.entity";


export class AddressRepositoryInMemory implements IAddressRepository {
  private addresses: Address[] = [];
  async create({street, district, complement, city, postal_code}: IAddressDtos): Promise<void> {
    const addresses = new Address();
    Object.assign(addresses, { street, district, complement, city, postal_code });
    this.addresses.push(addresses);
  }
  async findById(id: number): Promise<Address> {
    return this.addresses.find((address) => address.id === id );
  }
}
