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
  create(data: IDoseDtos): Promise<RelationshipVaccination> {
    throw new Error("Method not implemented.");
  }

  createMulti(data: IDoseDtos[]): Promise<RelationshipVaccination[]> {
    throw new Error("Method not implemented.");
  }
  
  findById(id: number): Promise<RelationshipVaccination> {
    throw new Error("Method not implemented.");
  }
 
}