import { Animal } from "../../typeorm/entities/Animal.entity";
import { IAnimalRepository } from "../IAnimalRepository";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";

export class AnimalRepositoryInMemory implements IAnimalRepository {
  private _animal: Animal[] = [];

  async create(form: IAnimalDtos): Promise<Animal> {
    const animal = new Animal();
    Object.assign(animal, form);
    this._animal.push(animal);
    return animal;
  }

  async findById(id: string): Promise<Animal> {
    return this._animal.find((org) => org.id === id);
  }

  async update(data: Animal, change_data: IAnimalDtos): Promise<Animal> {
    const animalIndex = this._animal.findIndex(animal => animal.id === data.id);
    if (animalIndex === -1) {
      throw new Error("Animal not found.");
    }
    const updatedAnimal = { ...this._animal[animalIndex], ...change_data };
    this._animal[animalIndex] = updatedAnimal as Animal;
    return updatedAnimal as Animal;
  }

  async delete(data: Animal): Promise<void> {
    this._animal = this._animal.filter(animal => animal.id !== data.id);
  }

  async find(criteria: object): Promise<Animal[]> {
    return this._animal.filter(animal => {
      return Object.keys(criteria).every(key => animal[key] === criteria[key]);
    });
  }

  async listAllByAccount(account_id: string): Promise<Animal[]> {
    return this._animal.filter(animal => animal.user.id === account_id);
  }

  async findByIdFullReturn(id: string): Promise<Animal> {
    return this.findById(id);
  }
}
