import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../../typeorm/entities/Organization.entity";
import { IOrganizationRepository } from "../IOrganizationsRepository";
import { OrganizationModel } from "@modules/organization/model/organization";

export class OrganizationRepositoryInMemory implements IOrganizationRepository {
  private _org: Organization[] = [];

  async create(form: IOrganizationDtos): Promise<Organization> {
    const organization = new Organization();
    Object.assign(organization, form);
    this._org.push(organization);
    return organization;
  }

  async update(org: Organization, change_data: OrganizationModel): Promise<Organization> {
    const orgIndex = this._org.findIndex((o) => o.id === org.id);
    if (orgIndex === -1) {
      throw new Error("Organization not found.");
    }
    this._org[orgIndex] = { ...this._org[orgIndex], ...change_data } as Organization;
    return this._org[orgIndex];
  }

  async delete(org: IOrganizationDtos): Promise<void> {
    const orgIndex = this._org.findIndex((o) => o.id === org.id);
    if (orgIndex === -1) {
      throw new Error("Organization not found.");
    }
    this._org.splice(orgIndex, 1);
  }

  async findByCpfCnpj(cnpjCpf: string): Promise<Organization> {
    const organization = this._org.find((org) => org.cnpj_cpf === cnpjCpf);
    if (!organization) {
      throw new Error("Organization not found.");
    }
    return organization;
  }

  async findExistsBy(found: string): Promise<boolean> {
    return this._org.some((org) => org.cnpj_cpf === found || org.id.toString() === found);
  }

  async findById(id: number): Promise<Organization> {
    const organization = this._org.find((org) => org.id === id);
    if (!organization) {
      throw new Error("Organization not found.");
    }
    return organization;
  }
}
