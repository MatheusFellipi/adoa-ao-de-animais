import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/utils/errors/AppError";

import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { RequestType } from "@shared/type/request.type";

@injectable()
export class DeleteAddressUseCase {
  constructor(
    @inject("IAddressRepository")
    private _address_repository: IAddressRepository
  ) {}
  async execute(id: number, account: { id: string }, type: RequestType): Promise<void> {
    const address = await this._address_repository.findById(id);
    if (address[type].id !== account.id)
      throw new AppError('Nao e possível deletar o endereços');
     await this._address_repository.delete(address)
  }
}
