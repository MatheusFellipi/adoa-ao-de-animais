import { IUserDtos, IUserUpdateDtos } from "@modules/user/dtos/IUserDtos";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

export interface IUsersRepository {
  create(data: IUserDtos): Promise<User>;
  update(user: User, change_date: IUserUpdateDtos): Promise<User>;
  findById(id: number): Promise<User>;
}

