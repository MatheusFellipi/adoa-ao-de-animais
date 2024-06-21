import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../typeorm/entities/Organization.entity";
import { OrganizationModel } from "@modules/organization/model/organization";

export interface IOrganizationRepository {
  create(data: IOrganizationDtos): Promise<Organization>;
  update(org: Organization, change_data: OrganizationModel): Promise<Organization>;
  delete(org: IOrganizationDtos): Promise<void>;
  findById(id: number): Promise<Organization>;
  findExistsBy(found: string): Promise<boolean>
}

