import { IDoseDtos } from "@modules/animal/dtos/IDoseDtos";
import { Dose } from "@modules/animal/infra/typeorm/entities/Dose";

export interface IDoseRepository {
  create(data: IDoseDtos): Promise<Dose>;
  findById(id: string): Promise<Dose>;
  delete(data: Dose): Promise<void>
}

