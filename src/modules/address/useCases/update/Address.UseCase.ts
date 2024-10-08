import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/utils/errors/AppError";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModel } from "@modules/address/model/address";
import { Address } from "../../infra/typeorm/entities/Address.entity";

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject("IAddressRepository") private _address_repository: IAddressRepository
  ) { }
  async execute(form: AddressModel): Promise<Address> {
    const instance = AddressModel.validade(form)
    const address = await this._address_repository.findById(instance.id)
    if (address.user.id !== instance.user.id)
      throw new AppError(`O endereços não pertence: Usuario ${address.user.name}`)
    return await this._address_repository.update(address, instance);
  }
}
