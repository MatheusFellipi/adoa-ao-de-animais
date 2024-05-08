import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { User } from "../typeorm/entities/users.entity";

export interface IUsersRepository {
  create(data: IUserDtos): Promise<User>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>
}

