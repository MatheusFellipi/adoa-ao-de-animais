import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"
import { IAddressRepository } from "../../repositories/IAddressRepository";

import { Address } from "../entities/address.entity";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";

export class AddressRepository implements IAddressRepository {
  private __repository: Repository<Address>;

  constructor() {
    this.__repository = dbContext.getRepository(Address);
  }

  async createMulti(data: IAddressDtos[]): Promise<Address[]> {
    const addresses: Address[] = [];
    for (const item of data) {
      const address = this.__repository.create(item);
      addresses.push(await this.__repository.save(address));
    }
    return addresses;
  }

  async create(data: IAddressDtos): Promise<Address> {
    const address = this.__repository.create(data);
    return await this.__repository.save(address);
  }

  async findById(id: number): Promise<Address> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { city: { state: true } }
    });
  }
}