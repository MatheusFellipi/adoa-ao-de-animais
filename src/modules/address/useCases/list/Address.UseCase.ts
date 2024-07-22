import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModel } from "@modules/address/model/address";

class AddressQueryModel {
  user_id?: string;

  static validade(form: AddressQueryModel) {
    return form;
  }
}

@injectable()
export class AddressUseCase {
  constructor(
    @inject("IAddressRepository")
    private _address_repository: IAddressRepository
  ) {}
  async execute(query: AddressQueryModel): Promise<AddressModel[]> {
    const instance = AddressQueryModel.validade(query);
    return await this._address_repository.find(instance.user_id);
  }
}
