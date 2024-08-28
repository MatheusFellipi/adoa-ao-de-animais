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

  async find(found: IAdQueryDtos): Promise<{
    data: AnimalAd[];
    total: number;
  }> {
    const query = this.__repository.createQueryBuilder("animal_ad");

    if (found.size) {
      query.andWhere("animal_ad.size = :size", { size: found.size });
    }
    if (found.title) {
      query.andWhere("animal_ad.title LIKE :title", {
        title: `%${found.title}%`,
      });
    }
    if (found.type) {
      query.andWhere("animal_ad.type = :type", { type: found.type });
    }
    if (found.gender) {
      query.andWhere("animal_ad.gender = :gender", { gender: found.gender });
    }
    if (found.sortField) {
      query.orderBy(
        `animal_ad.${found.sortField}`,
        found.sortOrder === "asc" ? "ASC" : "DESC"
      );
    }
    const total = await query.getCount();

    query.skip((found.page - 1) * found.limit);
    query.take(found.limit);
    const data = await query.getMany();

    return {
      data,
      total,
    };
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
