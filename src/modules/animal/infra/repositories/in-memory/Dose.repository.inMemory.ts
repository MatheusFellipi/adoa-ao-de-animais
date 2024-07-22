import { IDoseRepository } from "../IDoseRepository";
import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { RelationshipVaccination } from "../../typeorm/entities/Dose";

export class DoseRepositoryInMemory implements IDoseRepository {
  private _relation: RelationshipVaccination[] = [];

  async create(data: IDoseDtos): Promise<RelationshipVaccination> {
    const relation = new RelationshipVaccination();
    Object.assign(relation, data);
    this._relation.push(relation);
    return relation;
  }

  async findById(id: number): Promise<RelationshipVaccination> {
    return this._relation.find((relation) => relation.id === id);
  }

  async delete(data: RelationshipVaccination): Promise<void> {
    this._relation = this._relation.filter((relation) => relation.id !== data.id);
  }
}
