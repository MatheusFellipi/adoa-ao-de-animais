import { IStateDtos } from "@modules/address/dtos/IStateDtos";
import { State } from "../typeorm/entities/State.entity";

export interface IStateRepository {
  create(data: IStateDtos): Promise<State>;
  count(): Promise<number>
  find(found: any): Promise<State[]>;
  findById(id: number): Promise<State>;
}

