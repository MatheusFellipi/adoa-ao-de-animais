import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { AddressModelView } from "../modelView/address";

export class AdaptarAddress {
  static addressReturn(address: Address[]): AddressModelView[] {
    return address.map((item)=>(
      {
        id: item.id,
        street: item.street,
        postal_code: item.postal_code,
        district: item.district,
        complement: item.complement,
        city: item.city,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }
    ))
  }
}
