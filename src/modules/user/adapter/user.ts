import { User } from "../infra/typeorm/entities/Users.entity";
import { UserModal, UserUpdateModal } from "../model/user";

export class AdapterUser {
  static userReturn(user: User): UserModal {
    return {
      ...user,
      addresses: user.addresses
    };
  }
}
