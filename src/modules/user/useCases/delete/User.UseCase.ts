import { inject, injectable } from "tsyringe";
import configAws from "@shared/services/aws/delete.s3";

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository,
    @inject("IAddressRepository")
    private _address_repository: IAddressRepository
  ) {}
  async execute(userId: string): Promise<void> {
    const user = await this.__user_repository.findById(userId);
    if (!user) throw new AppError("Não e possível delete o Usuario");
    if (user.avatar) configAws.delete(user.avatar);
    const ad = await this._address_repository.find(userId)
    await this._address_repository.deleteByUser(ad.map(item => item.id));
    await this.__user_repository.delete(user);
  }
}
