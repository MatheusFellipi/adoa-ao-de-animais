import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { IOrganizationRepository } from "../../repositories/IOrganizationsRepository";
import { Organization } from "../entities/organization.entity";
import { IOrganizationDtos } from "@modules/organization/dtos/IOrganizationDtos";

export class OrganizationRepository implements IOrganizationRepository {
  private __repository: Repository<Organization>;

  constructor() {
    this.__repository = dbContext.getRepository(Organization);
  }
  
  async findExistsBy(found: string): Promise<boolean> {
    return await this.__repository.existsBy({ cnpj_cpf: found });
  }
  
  async create(data: IOrganizationDtos): Promise<Organization> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

  async findById(id: number): Promise<Organization> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{ addresses: true }
    });
  }
}