import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../typeorm/entities/organization.entity";

export interface IOrganizationRepository {
  create(data: IOrganizationDtos): Promise<Organization>;
  update(org: Organization, change_data): Promise<Organization>;
  delete(org: IOrganizationDtos): Promise<void>;
  findById(id: number): Promise<Organization>;
  findExistsBy(found: string): Promise<boolean>
}

