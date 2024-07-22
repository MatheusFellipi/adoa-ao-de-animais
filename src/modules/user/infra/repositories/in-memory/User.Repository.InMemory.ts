import { User } from "../../typeorm/entities/Users.entity";
import { IUserDtos, IUserUpdateDtos } from "@modules/user/dtos/IUserDtos";
import { IUsersRepository } from "../IUsersRepository";

export class UserRepositoryInMemory implements IUsersRepository {
  private _user: User[] = [];

  async create(form: IUserDtos): Promise<User> {
    const user = new User();
    Object.assign(user, form);
    this._user.push(user);
    return user;
  }

  async update(user: User, change_data: IUserUpdateDtos): Promise<User> {
    // const userIndex = this._user.findIndex((usr) => usr.id === user.id);
    // if (userIndex === -1) {
    //   throw new Error("User not found.");
    // }
    // this._user[userIndex] = { ...this._user[userIndex], ...change_data };
    return this._user[0];
  }

  async delete(user: IUserDtos): Promise<void> {
    const userIndex = this._user.findIndex((usr) => usr.id === user.id);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }
    this._user.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User> {
    const user = this._user.find((usr) => usr.id === id);
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }
}