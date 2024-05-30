import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UserModalView } from "@modules/user/modelView/user";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) { }
  async execute(data: UserModalView): Promise<User> {
    const user = UserModalView.validade(data)
    return await this.userRepository.create(user);
  }
}
