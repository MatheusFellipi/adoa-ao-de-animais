import { Repository } from "typeorm";
import { autoInjectable } from "tsyringe";

import { dbContext } from "@shared/infra/typeorm"
import { Address } from "../entities/address.entity";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IAddressDtos } from "@modules/address/dtos/IAddressDtos";




@autoInjectable()
export class AddressRepository implements IAddressRepository {
  private __repository: Repository<Address>;

  constructor(private context: typeof dbContext) {
    this.__repository = context.getRepository(Address);
  }

  async create({ street, complement, district, postal_code, city, organization, user, }: IAddressDtos): Promise<Address> {
    const address = this.__repository.create({ user, street, complement, district, postal_code, city });
    return await this.__repository.save(address);
  }

  async findById(id: number): Promise<Address> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: { city: { state: true } }
    });
  }
}