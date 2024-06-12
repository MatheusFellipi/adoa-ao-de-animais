import { Animal } from "../typeorm/entities/Animal.entity";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export interface IAnimalRepository {
  create(data: IAnimalDtos): Promise<Animal>;
  update(data: Animal, change_data: IAnimalDtos): Promise<Animal>;
  delete(data: Animal): Promise<void>;
  find(criteria: object): Promise<Animal[]>
  findById(id: number): Promise<Animal>;
  listAllByAccount(account_id: number): Promise<Animal[]>;
  findByIdFullReturn(id: number): Promise<Animal>;
}
