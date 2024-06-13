import { City } from "../typeorm/entities/City.entity";

export interface ICityRepository {
  create(data: City): Promise<City>;
  find(found: any): Promise<City[]>;
  findById(id: number): Promise<City>;
}

