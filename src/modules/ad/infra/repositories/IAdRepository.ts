import { IAdDtos } from "@modules/ad/dtos/IAdDtos";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { AnimalAd } from "../typeorm/entities/Ad.entity";
import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdQueryDtos } from "@modules/ad/dtos/IAdQueryDtos";

export interface IAdRepository {
  create(data: IAdDtos): Promise<AnimalAd>;
  update(data: IAdDtos, change_data: AnimalAdNModel): Promise<AnimalAd>;
  delete(data: IAdDtos): Promise<void>;
  find(found: IAdQueryDtos): Promise<AnimalAd[]>;
  findById(id: number): Promise<AnimalAd>;
  findByAccountID(found: number): Promise<AnimalAd[]>;
}
