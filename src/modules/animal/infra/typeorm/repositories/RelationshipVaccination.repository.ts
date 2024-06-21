import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { IDoseRepository } from "../../repositories/IDoseRepository";
import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { RelationshipVaccination } from "../entities/RelationshipVaccination.entity";

export class DoseRepository implements IDoseRepository {
  private __repository: Repository<RelationshipVaccination>;

  constructor() {
    this.__repository = dbContext.getRepository(RelationshipVaccination);
  }

  async delete(data: RelationshipVaccination): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async create(data: IDoseDtos): Promise<RelationshipVaccination> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

  async findById(id: number): Promise<RelationshipVaccination> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }
}
