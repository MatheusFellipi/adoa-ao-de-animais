import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";

import { Address } from "../../infra/typeorm/entities/Address.entity";

import { AppError } from "@shared/infra/errors/AppError";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModelView } from "@modules/address/model/address";


@injectable()
export class AddressUseCase {
  constructor(
    @inject("IAddressRepository") private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModelView): Promise<Address> {
    const address = new AddressModelView()
    Object.assign(address, form);
    const errors = await validate(address)
    if (errors.length > 0) throw new AppError(errors.join(", "), 401)
    return await this._address_repository.create(address);
  }
}
