import { Repository } from "typeorm";

import { dbContext } from "@shared/infra/typeorm";

import { AnimalAd } from "@modules/ad/infra/typeorm/entities/Ad.entity";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { IAdDtos } from "@modules/ad/dtos/IAdDtos";
import { IAdQueryDtos } from "@modules/ad/dtos/IAdQueryDtos";

export class AdRepository implements IAdRepository {
  private __repository: Repository<AnimalAd>;

  constructor() {
    this.__repository = dbContext.getRepository(AnimalAd);
  }

  async create(data: IAdDtos): Promise<AnimalAd> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async update(data: AnimalAd, change_data: IAdDtos): Promise<AnimalAd> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.__repository.delete({ id });
  }

  async find(found: IAdQueryDtos): Promise<AnimalAd[]> {
    const query = this.__repository.createQueryBuilder("ad");

    if (found.ad_id)
      query.andWhere("ad.ad_id = :ad_id", { ad_id: found.ad_id });
    if (found.size) query.andWhere("ad.size = :size", { size: found.size });
    if (found.title)
      query.andWhere("ad.title LIKE :title", { title: `%${found.title}%` });
    if (found.type) query.andWhere("ad.type = :type", { type: found.type });
    if (found.gender)
      query.andWhere("ad.gender = :gender", { gender: found.gender });
    if (found.sortField)
      query.orderBy(
        `ad.${found.sortField}`,
        found.sortOrder === "asc" ? "ASC" : "DESC"
      );

    query.skip((found.page - 1) * found.limit);
    query.take(found.limit);

    return await query.getMany();
  }

  async findById(id: string): Promise<AnimalAd> {
    return await this.__repository.findOne({
      where: {
        id: id,
      },
      relations: {
        animal: {
          user: true,
          photos: true,
          vaccinationCard: {
            dose: {
              vaccination: true,
            },
          },
        },
      },
    });
  }

  async findByAccountID(found: string): Promise<AnimalAd[]> {
    throw new Error("Method not implemented.");
  }
}
