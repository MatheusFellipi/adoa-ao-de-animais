import { User } from "../infra/typeorm/entities/Users.entity";
import { UserModal, UserUpdateModalView } from "../model/user";

export class AdapterUser {
  static userReturn(user: User): UserModal {
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
