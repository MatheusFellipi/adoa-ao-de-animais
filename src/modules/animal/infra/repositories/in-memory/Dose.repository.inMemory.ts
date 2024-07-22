import { DoseRepository } from "@modules/animal/infra/typeorm/repositories/Dose.repository";
import { IDoseRepository } from "../IDoseRepository";
import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { Dose } from "@modules/animal/infra/typeorm/entities/Dose";

export class DoseRepositoryInMemory implements IDoseRepository {
  private _relation: Dose[] = [];

  async create(data: IDoseDtos): Promise<Dose> {
    const relation = new Dose();
    Object.assign(relation, data);
    this._relation.push(relation);
    return relation;
  }

  async findById(id: string): Promise<Dose> {
    return this._relation.find((relation) => relation.id === id);
  }

  async delete(data: Dose): Promise<void> {
    this._relation = this._relation.filter((relation) => relation.id !== data.id);
  }
}
