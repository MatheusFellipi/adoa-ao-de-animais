import { IAddressRepository } from "../IAddressRepository";
import { Address } from "../../typeorm/entities/Address.entity";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";

export class AddressRepositoryInMemory implements IAddressRepository {
  private _addresses: Address[] = [];

  async create({
    street,
    district,
    complement,
    city,
    postal_code,
  }: IAddressDtos): Promise<Address> {
    const addresses = new Address();
    Object.assign(addresses, {
      street,
      district,
      complement,
      city,
      postal_code,
    });
    this._addresses.push(addresses);
    return addresses;
  }

  async createMulti(data: IAddressDtos[]): Promise<Address[]> {
    const addresses = data.map((dto) => {
      const address = new Address();
      Object.assign(address, dto);
      return address;
    });
    this._addresses.push(...addresses);
    return addresses;
  }

  async update(address: Address, change_data: IAddressDtos): Promise<Address> {
    const index = this._addresses.findIndex((addr) => addr.id === address.id);
    if (index === -1) {
      throw new Error("Address not found.");
    }
    this._addresses[index] = { ...this._addresses[index], ...change_data } as Address;
    return this._addresses[index];
  }

  async delete(address: IAddressDtos): Promise<void> {
    const addressIndex = this._addresses.findIndex((addr) => addr.id === address.id);
    if (addressIndex === -1) {
      throw new Error("Address not found.");
    }
    this._addresses.splice(addressIndex, 1);
  }

  async find(found: any): Promise<Address[]> {
    return this._addresses.filter((address) => {
      return Object.entries(found).every(([key, value]) => address[key] === value);
    });
  }

  async findById(id: string): Promise<Address> {
    const address = this._addresses.find((address) => address.id === id);
    if (!address) {
      throw new Error("Address not found.");
    }
    return address;
  }
}
