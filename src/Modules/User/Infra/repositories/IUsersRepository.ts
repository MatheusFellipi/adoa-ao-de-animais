import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { User } from "../typeorm/entities/users.entity";

export interface IUsersRepository {
  create(data: IUserDtos): Promise<User>;
  update(data: User): Promise<User>;
  findById(id: number): Promise<User>;
}

