import { inject, injectable } from "tsyringe";

import { Address } from "../../infra/typeorm/entities/address.entity";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModelView } from "@modules/address/modelView/address";


@injectable()
export class CreateMultiUseCase {
  constructor(
    @inject("IAddressRepository") private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModelView[], relation: Object, key: "user" ): Promise<Address[]> {
    const address = form.map(item => (
      {
        [key]: relation,
        ...item
      }
    ))
    return await this._address_repository.createMulti(address)
  }
}
