import { inject, injectable } from "tsyringe";
import { validate } from "class-validator";
import { AppError } from "@shared/infra/errors/AppError";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UserModelView } from "@modules/user/modelView/user";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) {}

  async execute(data: UserModelView): Promise<User> {
    const user = new UserModelView();
    Object.assign(user, data);
    const errors = await validate(user);

    if (errors.length > 0) {
      const errorMessage = errors.map((error) => Object.values(error.constraints)).join(", ");
      throw new AppError(errorMessage.toString(), 400);
    }
    const existing_user = await this.userRepository.findByEmail(data.email);
    if (existing_user) {
      throw new AppError("Email address is already in use", 400);
    }
    
    return await this.userRepository.create(data);
  }
}
