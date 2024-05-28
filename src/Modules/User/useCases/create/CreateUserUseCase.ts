import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/infra/errors/AppError";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UserModalView } from "@modules/user/modelView/user";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) { }
  async execute(data: UserModalView): Promise<User> {
    UserModalView.validade(data)
    const existing_user = await this.userRepository.findByEmail(data.email);
    if (existing_user) throw new AppError("O E-mail já esta em uso.", 400);
    return await this.userRepository.create(data);
  }
}
