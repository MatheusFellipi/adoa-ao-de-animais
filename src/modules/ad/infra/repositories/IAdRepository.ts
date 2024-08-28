import { IAdDtos } from "@modules/ad/dtos/IAdDtos";
import { AnimalAd } from "../typeorm/entities/Ad.entity";
import { AnimalAdNModel } from "@modules/ad/model/ad";
import { IAdQueryDtos } from "@modules/ad/dtos/IAdQueryDtos";

export interface IAdRepository {
  create(data: IAdDtos): Promise<AnimalAd>;
  update(data: IAdDtos, change_data: AnimalAdNModel): Promise<AnimalAd>;
  delete(id: string): Promise<void>;
  find(found: IAdQueryDtos): Promise<AnimalAd[]>;
  findById(id: string): Promise<AnimalAd>;
  findByAccountID(found: string): Promise<AnimalAd[]>;
}
