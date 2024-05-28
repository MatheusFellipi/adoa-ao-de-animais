import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";

import { Address } from "../../infra/typeorm/entities/address.entity";

import { AppError } from "@shared/infra/errors/AppError";
import { IAddressRepository } from "@modules/helper/address/infra/repositories/IAddressRepository";
import { AddressModelView } from "@modules/helper/address/modelView/address";

@injectable()
export class AddressUseCase {
  constructor(
    @inject("AddressRepository")
    private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModelView): Promise<Address> {
    const address = new AddressModelView()
    Object.assign(address, form);
    const errors = await validate(address)
    if (errors.length > 0) throw new AppError(errors.join(", "), 401)
    return await this._address_repository.create(address);
  }
}
