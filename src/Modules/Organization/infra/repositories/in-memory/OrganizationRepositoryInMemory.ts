import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { Organization } from "../../typeorm/entities/organization.entity";
import { IOrganizationRepository } from "../IOrganizationsRepository";


export class OrganizationRepositoryInMemory implements IOrganizationRepository {
  private _org: Organization[] = [];

  async create(form: IUserDtos): Promise<Organization> {
    const users = new Organization();
    Object.assign(users, form);
    this._org.push(users);
    return users
  }

  async findByCpfCnpj(cnpjCpf: string): Promise<Organization> {
    return this._org.find((org) => org.cnpj_cpf === cnpjCpf);
  }

  async findById(id: number): Promise<Organization> {
    return this._org.find((org) => org.id === id);
  }
}
