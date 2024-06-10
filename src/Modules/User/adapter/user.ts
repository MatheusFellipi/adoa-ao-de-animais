import { User } from "../infra/typeorm/entities/Users.Entity";
import { UserModalView, UserUpdateModalView } from "../model/user";

export class AdapterUser {
  static userReturn(user: User): UserModalView {
    return {
      ...user,
      addresses: user.addresses,
      links: user.links,
      contacts: user.contacts,
    };
  }
  static userUpdateReturn(user: User): UserUpdateModalView {
    return {
      name: user.name,
      avatar: user.avatar,
    };
  }
}
