import { Animal } from "../typeorm/entities/animal.entity";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export interface IAnimalRepository {
  create(data: IAnimalDtos): Promise<Animal>;
  findById(id: number): Promise<Animal>;
}

