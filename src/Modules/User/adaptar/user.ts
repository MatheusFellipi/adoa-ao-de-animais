import { User } from "../infra/typeorm/entities/users.entity";
import { UserModalView } from "../modelView/user";
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
}
