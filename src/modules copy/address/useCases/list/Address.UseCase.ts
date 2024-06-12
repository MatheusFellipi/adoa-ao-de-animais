import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressModel } from "@modules/address/model/address";

class AddressQueryModel {
  user_id?: number;
  organization_id?: number;

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
    let id: number;
    if (instance.organization_id) id = instance.organization_id;
    else if (instance.user_id) id = instance.user_id;

    return await this._address_repository.find(id);
  }
}
