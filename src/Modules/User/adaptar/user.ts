import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { User } from "../infra/typeorm/entities/users.entity";
import { UserModalView } from "../modelView/user";


export class AdaptarUser {
  static userReturn(address: Address[], user: User): UserModalView {
    return {
      ...user,
      addresses: address
    }
  }
}
