import { inject, injectable } from "tsyringe";

import { UserModal } from "@modules/user/model/user";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";

import { AdapterUser } from "@modules/user/adapter/user";
import { AppError } from "@shared/utils/errors/AppError";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository") private __user_repository: IUsersRepository
  ) {}
  async execute(data: UserModal): Promise<UserModal> {
    const instance = await UserModal.validate(data);
    const exist = await this.__user_repository.findByCpfCnpj(instance.cnpj_cpf)
    if (exist) throw new AppError("A conta ja exite come esse cpf/cnpj", 400);
    const user = await this.__user_repository.create(instance);
    return AdapterUser.userReturn(user);
  }
}
