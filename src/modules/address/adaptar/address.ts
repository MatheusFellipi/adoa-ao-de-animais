import { Address } from "@modules/address/infra/typeorm/entities/Address.entity";
import { AddressModel } from "../model/address";

export class AdaptarAddress {
  static addressMultiReturn(address: Address[]): AddressModel[] {
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
  static addressReturn(address: Address): AddressModel {
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
