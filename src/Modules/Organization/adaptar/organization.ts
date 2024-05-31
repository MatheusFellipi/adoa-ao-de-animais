import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { Organization } from "../infra/typeorm/entities/organization.entity";
import { OrganizationModelView } from "../modelView/organization";


export class AdaptarOrgs {
  static orgsReturn(address: Address[], orgs: Organization): OrganizationModelView {
    return {
      ...orgs,
      addresses: address
    }
  }
}
