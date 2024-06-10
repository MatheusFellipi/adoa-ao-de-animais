import { User } from "../../typeorm/entities/Users.Entity";
import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { IUsersRepository } from "../IUsersRepository";


class UserRepositoryInMemory implements IUsersRepository {
  private _user: User[] = [];
  async create(form: IUserDtos): Promise<User> {
    const users = new User();
    Object.assign(users, form);
    this._user.push(users);
    return users
  }
  findByEmail(email: string): Promise<User> {
    return this._user.find((user) => user.email === email)[0];
  }
  async findById(id: number): Promise<User> {
    return this._user.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory }