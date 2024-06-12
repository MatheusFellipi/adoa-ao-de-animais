import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";

import { Address } from "../../infra/typeorm/entities/Address.entity";

import { AppError } from "@shared/infra/errors/AppError";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModel } from "@modules/address/model/address";

@injectable()
export class AddressUseCase {
  constructor(
    @inject("IAddressRepository")
    private _address_repository: IAddressRepository
  ) {}
  async execute(form: AddressModel): Promise<Address> {
    const instance = AddressModel.validade(form);
    return await this._address_repository.create(instance);
  }
}
