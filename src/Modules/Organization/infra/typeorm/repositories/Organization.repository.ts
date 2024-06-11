import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { IOrganizationRepository } from "../../repositories/IOrganizationsRepository";
import { Organization } from "../entities/Organization.entity";
import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";

export class OrganizationRepository implements IOrganizationRepository {
  private __repository: Repository<Organization>;

  constructor() {
    this.__repository = dbContext.getRepository(Organization);
  }

  async delete(org: IOrganizationDtos): Promise<void> {
   await this.__repository.delete(org)
  }
  
  async findExistsBy(found: string): Promise<boolean> {
    return await this.__repository.existsBy({ cnpj_cpf: found });
  }
  
  async update(org: Organization, change_data): Promise<Organization> {
    this.__repository.merge(org, change_data);
    return await this.__repository.save(org);
  }
  
  async create(data: IOrganizationDtos): Promise<Organization> {
    const orgs = this.__repository.create(data);
    return await this.__repository.save(orgs);
  }

  async findById(id: number): Promise<Organization> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{ addresses: true }
    });
  }
}