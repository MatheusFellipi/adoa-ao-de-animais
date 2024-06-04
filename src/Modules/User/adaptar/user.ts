import { User } from "../infra/typeorm/entities/users.entity";
import { UserModalView, UserUpdateModalView } from "../modelView/user";
import { AddressModelView } from "@modules/address/modelView/address";


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
