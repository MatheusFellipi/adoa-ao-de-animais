import { IAdRepository } from "../IAdRepository";
import { AnimalAd } from "../../typeorm/entities/Ad.entity";
import { IAdDtos } from "@modules/ad/dtos/IAdDtos";
import { IAdQueryDtos } from "@modules/ad/dtos/IAdQueryDtos";
import { AnimalAdNModel } from "@modules/ad/model/ad";

export class AdRepositoryInMemory implements IAdRepository {
  private _animals: AnimalAd[] = [];

  async create(data: IAdDtos): Promise<AnimalAd> {
    const newAd = new AnimalAd();
    Object.assign(newAd, data);
    this._animals.push(newAd);
    return newAd;
  }

  async update(data: IAdDtos, change_data: AnimalAdNModel): Promise<AnimalAd> {
    const index = this._animals.findIndex(token => token.id === data.id);
    if (index === -1) {
      throw new Error("");
    }
    const updatedToken = { ...this._animals[index], ...change_data };
    this._animals[index] = updatedToken;
    return updatedToken;
  }

  async delete(data: IAdDtos): Promise<void> {
    const adIndex = this._animals.findIndex(ad => ad.id === data.id);
    if (adIndex === -1) {
      throw new Error("Ad not found.");
    }
    this._animals.splice(adIndex, 1);
  }

  async find(found: IAdQueryDtos): Promise<AnimalAd[]> {
    return this._animals.filter(ad => {
      return Object.entries(found).every(([key, value]) => ad[key] === value);
    });
  }

  async findById(id: number): Promise<AnimalAd> {
    const ad = this._animals.find(ad => ad.id === id);
    if (!ad) {
      throw new Error("Ad not found.");
    }
    return ad;
  }

  async findByAccountID(accountId: number): Promise<AnimalAd[]> {
    return this._animals.filter(animal => animal.animal.organization.id === accountId || animal.animal.user.id === accountId);
  }
}
