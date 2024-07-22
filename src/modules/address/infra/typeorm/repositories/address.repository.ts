import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";
import { IAddressRepository } from "../../repositories/IAddressRepository";

import { Address } from "../entities/Address.entity";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";

export class AddressRepository implements IAddressRepository {
  private __repository: Repository<Address>;

  constructor() {
    this.__repository = dbContext.getRepository(Address);
  }

  async delete(address: IAddressDtos): Promise<void> {
    await this.__repository.delete({
      id: address.id,
    });
  }

  async find(found: any): Promise<Address[]> {
    return await this.__repository
      .createQueryBuilder("addresses")
      .where("addresses.organization_id = :id OR addresses.user_id = :id", {
        id: found,
      })
      .getMany();
  }

  async createMulti(data: IAddressDtos[]): Promise<Address[]> {
    const addresses: Address[] = [];
    for (const item of data) {
      addresses.push(
        await this.__repository.save(this.__repository.create(item))
      );
    }
    return addresses;
  }

  async create(data: IAddressDtos): Promise<Address> {
    const address = this.__repository.create(data);
    return await this.__repository.save(address);
  }

  async update(address: Address, change_data: IAddressDtos): Promise<Address> {
    this.__repository.merge(address, change_data);
    return await this.__repository.save(address);
  }

  async findById(id: string): Promise<Address> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: {
        city: { state: true },
        user: true,
      },
    });
  }
}
