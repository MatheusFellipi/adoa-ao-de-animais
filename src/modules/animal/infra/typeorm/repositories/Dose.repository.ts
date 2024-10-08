import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { IDoseRepository } from "../../repositories/IDoseRepository";
import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { Dose } from "@modules/animal/infra/typeorm/entities/Dose.entity";

export class DoseRepository implements IDoseRepository {
  private __repository: Repository<Dose>;

  constructor() {
    this.__repository = dbContext.getRepository(Dose);
  }

  async delete(data: IDoseDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async create(data: IDoseDtos): Promise<Dose> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async findById(id: string): Promise<Dose> {
    return await this.__repository.findOne({
      where: { id: id },
    });
  }
}
