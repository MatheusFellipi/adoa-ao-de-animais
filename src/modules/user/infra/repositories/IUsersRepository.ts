import { IUserDtos, IUserUpdateDtos } from "@modules/user/dtos/IUserDtos";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";

export interface IUsersRepository {
  create(data: IUserDtos): Promise<User>;
  update(user: User, change_date: IUserUpdateDtos): Promise<User>;
  delete(user: IUserDtos): Promise<void>;
  findById(id: string): Promise<User>;
  findByCpfCnpj(found: string): Promise<boolean>;
}

