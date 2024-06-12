import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";
import { Organization } from "../../typeorm/entities/Organization.entity";
import { IOrganizationRepository } from "../IOrganizationsRepository";


export class OrganizationRepositoryInMemory implements IOrganizationRepository {

  private _org: Organization[] = [];

  async create(form: IOrganizationDtos): Promise<Organization> {
    const users = new Organization();
    Object.assign(users, form);
    this._org.push(users);
    return users
  }

  async findByCpfCnpj(cnpjCpf: string): Promise<Organization> {
    return this._org.find((org) => org.cnpj_cpf === cnpjCpf);
  }

  findExistsBy(found: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<Organization> {
    return this._org.find((org) => org.id === id);
  }
}
