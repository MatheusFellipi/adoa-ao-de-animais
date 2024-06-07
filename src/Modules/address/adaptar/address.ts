import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { AddressModelView } from "../model/address";

export class AdaptarAddress {
  static addressMultiReturn(address: Address[]): AddressModelView[] {
    return address.map((item) => (
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
  static addressReturn(address: Address): AddressModelView {
    return {
      id: address.id,
      street: address.street,
      postal_code: address.postal_code,
      district: address.district,
      complement: address.complement,
      city: address.city,
      created_at: address.created_at,
      updated_at: address.updated_at,
    }
  }
}
