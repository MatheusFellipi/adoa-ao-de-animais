import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../typeorm/entities/organization.entity";

export interface IOrganizationRepository {
  create(data: IOrganizationDtos): Promise<Organization>;
  findById(id: number): Promise<Organization>;
  findExistsBy(found: string): Promise<boolean>
}
