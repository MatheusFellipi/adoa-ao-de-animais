import { OrganizationType } from "../enums/organization.enum";
import { Organization } from "../infra/typeorm/entities/Organization.entity";
import { OrganizationModel, OrganizationUpdateModel } from "../model/organization";
import { AddressModel } from "@modules/address/model/address";


export class AdaptarOrgs {
  static orgsReturn(address: AddressModel[], orgs: Organization, link, contacts): OrganizationModel {
    return {
      ...orgs,
      addresses: address
    }
  }
  static orgsUpdateReturn(orgs: OrganizationUpdateModel): OrganizationUpdateModel {
    return {
      cnpj_cpf: orgs.cnpj_cpf,
      operation_at: orgs.operation_at,
      avatar: orgs.avatar,
      description: orgs.description,
      id: orgs.id,
      name: orgs.name,
    }
  }
}
