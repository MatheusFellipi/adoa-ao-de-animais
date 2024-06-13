import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { IStateRepository } from "../../repositories/IStateRepository";
import { State } from "../entities/State.entity";

export class StateRepository implements IStateRepository {
  private __repository: Repository<State>;

  constructor() {
    this.__repository = dbContext.getRepository(State);
  }

  async create(data: State): Promise<State> {
    const city = this.__repository.create(data);
    return await this.__repository.save(city);
  }

  async find(found: any): Promise<State[]> {
    return await this.__repository.find();
  }

  async count(): Promise<number> {
    return await this.__repository.count()
  }

  async findById(id: number): Promise<State> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }
}
