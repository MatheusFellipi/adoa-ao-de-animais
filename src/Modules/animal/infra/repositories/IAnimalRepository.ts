import { Animal } from "../typeorm/entities/animal.entity";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export interface IAnimalRepository {
  create(data: IAnimalDtos): Promise<Animal>;
  update(data: Animal, change_data: IAnimalDtos): Promise<Animal>;
  delete(data: Animal): Promise<void>;
  listAllByAccount(account_id: number): Promise<Animal[]>;
  findById(id: number): Promise<Animal>;
  findByIdFullReturn(id: number): Promise<Animal>;
}
