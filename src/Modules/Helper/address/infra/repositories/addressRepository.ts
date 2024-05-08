import { Repository } from "typeorm";
import { autoInjectable } from "tsyringe";

import { dbContext } from "@shared/infra/typeorm"

import { IAddressRepository } from "./IAddressRepository";
import { Address } from "../typeorm/entities/address.entity";
import { IAddressDtos } from "../../dtos/IAddressDtos";


@autoInjectable()
export class AddressRepository implements IAddressRepository {
  private __repository: Repository<Address>;

  constructor(private context: typeof dbContext) {
    this.__repository = context.getRepository(Address);
  }

  async create({ street, complement, district, postal_code, city }: IAddressDtos): Promise<void> {
    const user = this.__repository.create({ street, complement, district, postal_code, city });
    await this.__repository.save(user);
  }

  async findById(id: number): Promise<Address> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{ city: { state: true } }
    });
  }
}