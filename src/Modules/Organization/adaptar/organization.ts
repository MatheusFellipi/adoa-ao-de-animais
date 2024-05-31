import { Organization } from "../infra/typeorm/entities/organization.entity";
import { OrganizationModelView } from "../modelView/organization";
import { AddressModelView } from "@modules/address/modelView/address";


export class AdaptarOrgs {
  static orgsReturn(address: AddressModelView[], orgs: Organization, link, contacts): OrganizationModelView {
    return {
      ...orgs,
      addresses: address
    }
  }
}
