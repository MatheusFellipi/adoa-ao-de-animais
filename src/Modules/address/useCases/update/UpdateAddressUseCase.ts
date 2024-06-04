import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/infra/errors/AppError";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModelView } from "@modules/address/modelView/address";
import { Address } from "../../infra/typeorm/entities/address.entity";


@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject("IAddressRepository") private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModelView, type: string): Promise<Address> {
    const instance = AddressModelView.validade(form)
    const address = await this._address_repository.findById(instance.id)

    if (address[type].id !== instance[type].id)
      throw new AppError(`O endereços não pertence: ${type} ${address[type].name}`)

    return await this._address_repository.update(address, instance);
  }
}
