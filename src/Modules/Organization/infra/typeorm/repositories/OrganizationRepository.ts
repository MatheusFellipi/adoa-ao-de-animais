import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm"

import { IUserDtos } from "@modules/user/dtos/IUserDtos";
import { IOrganizationRepository } from "../../repositories/IOrganizationsRepository";
import { Organization } from "../entities/organization.entity";

export class OrganizationRepository implements IOrganizationRepository {
  private __repository: Repository<Organization>;

  constructor() {
    this.__repository = dbContext.getRepository(Organization);
  }

  
  async findByCpfCnpj(email: string): Promise<Organization> {
    return await this.__repository.findOne({
      where: { email: email },
    });
  }

  async create(data: IUserDtos): Promise<Organization> {
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