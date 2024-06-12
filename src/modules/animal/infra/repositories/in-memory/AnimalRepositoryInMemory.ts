import { Animal } from "../../typeorm/entities/Animal.entity";
import { IAnimalRepository } from "../IAnimalRepository";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";


export class AnimalRepositoryInMemory implements IAnimalRepository {
  private _org: Animal[] = [];

  async create(form: IAnimalDtos): Promise<Animal> {
    const users = new Animal();
    Object.assign(users, form);
    this._org.push(users);
    return users
  }

  async findById(id: number): Promise<Animal> {
    return this._org.find((org) => org.id === id);
  }
}
