import { User } from "../infra/typeorm/entities/users.entity";
import { UserModalView, UserUpdateModalView } from "../model/user";
import { AddressModelView } from "@modules/address/model/address";


export class AdaptarUser {
  static userReturn(addresses: AddressModelView[], user: User, links, contacts): UserModalView {
    return {
      ...user,
      addresses,
      links, 
      contacts
    }
  }
  static userUpdateReturn( user: User): UserUpdateModalView {
    return {
      name: user.name,
      avatar: user.avatar,
    }
  }
}
