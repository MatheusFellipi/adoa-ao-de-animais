import { Repository } from "typeorm";
import { autoInjectable } from "tsyringe";

import { dbContext } from "@shared/infra/typeorm"
import { Address } from "../entities/address.entity";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IAddressDtos } from "@modules/helper/address/dtos/IAddressDtos";




@autoInjectable()
export class AddressRepository implements IAddressRepository {
  private __repository: Repository<Address>;

  constructor(private context: typeof dbContext) {
    this.__repository = context.getRepository(Address);
  }

  async create({ street, complement, district, postal_code, city }: IAddressDtos): Promise<Address> {
    const user = this.__repository.create({ street, complement, district, postal_code, city });
    return await this.__repository.save(user);
  }

  async findById(id: number): Promise<Address> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{ city: { state: true } }
    });
  }
}