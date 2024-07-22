import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { RelationshipVaccination } from "../typeorm/entities/Dose";

export interface IDoseRepository {
  create(data: IDoseDtos): Promise<RelationshipVaccination>;
  findById(id: number): Promise<RelationshipVaccination>;
  delete(data: RelationshipVaccination): Promise<void>
}

