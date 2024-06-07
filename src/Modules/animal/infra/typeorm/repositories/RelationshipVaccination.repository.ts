import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IDoseRepository } from "../../repositories/IDoseRepository";
import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { RelationshipVaccination } from "../entities/relationshipVaccination.entity";

export class DoseRepository implements IDoseRepository {
  private __repository: Repository<RelationshipVaccination>;

  constructor() {
    this.__repository = dbContext.getRepository(RelationshipVaccination);
  }
  delete(data: RelationshipVaccination): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(data: IDoseDtos): Promise<RelationshipVaccination> {
    return await this.__repository.save(this.__repository.create(data))
  }

  findById(id: number): Promise<RelationshipVaccination> {
    throw new Error("Method not implemented.");
  }
 
}