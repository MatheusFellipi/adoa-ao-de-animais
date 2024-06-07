import { OrganizationType } from "../enums/organization.enum";
import { Organization } from "../infra/typeorm/entities/organization.entity";
import { OrganizationModelView, OrganizationUpdateModelView } from "../model/organization";
import { AddressModelView } from "@modules/address/model/address";


export class AdaptarOrgs {
  static orgsReturn(address: AddressModelView[], orgs: Organization, link, contacts): OrganizationModelView {
    return {
      ...orgs,
      addresses: address
    }
  }
  static orgsUpdateReturn(orgs: OrganizationUpdateModelView): OrganizationUpdateModelView {
    return {
      cnpj_cpf: orgs.cnpj_cpf,
      operation_at: orgs.operation_at,
      type: OrganizationType[orgs.type],
      avatar: orgs.avatar,
      description: orgs.description,
      id: orgs.id,
      name: orgs.name,
    }
  }
}
