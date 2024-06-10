import { User } from "../infra/typeorm/entities/Users.Entity";
import { UserModalView, UserUpdateModalView } from "../model/user";
import { AddressModelView } from "@modules/address/model/address";

export class AdaptarUser {
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
