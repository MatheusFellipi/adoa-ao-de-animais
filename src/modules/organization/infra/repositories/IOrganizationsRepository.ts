import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../typeorm/entities/Organization.entity";

export interface IOrganizationRepository {
  create(data: IOrganizationDtos): Promise<Organization>;
  update(
    org: IOrganizationDtos,
    change_data: Omit<IOrganizationDtos, "addresses" | "type">
  ): Promise<Organization>;
  delete(org: IOrganizationDtos): Promise<void>;
  findById(id: number): Promise<Organization>;
  findExistsBy(found: string): Promise<boolean>;
}
