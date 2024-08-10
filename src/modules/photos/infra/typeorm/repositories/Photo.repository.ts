import { In, Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { IPhotosRepository } from "../../repositories/IPhotosRepository";
import { Photo } from "../entities/Photos.entity";
import { IPhotoDtos } from "@modules/photos/dtos/IPhotoDtos";

export class PhotoRepository implements IPhotosRepository {
  private __repository: Repository<Photo>;

  constructor() {
    this.__repository = dbContext.getRepository(Photo);
  }

  listByIdAnimal(id: string): Promise<Photo[]> {
    return this.__repository.find({
      where: {
        animal:{
          id
        },
      },
    });
  }

  create(data: IPhotoDtos): Promise<Photo> {
    return this.__repository.save(this.__repository.create(data));
  }

  update(data: Photo, change_data: IPhotoDtos): Promise<Photo> {
    throw new Error("Method not implemented.");
  }

  async delete(photos: Photo[]): Promise<void> {
    await this.__repository.remove(photos);
  }

  async findByIdsAnimal(data_ids: string[], animal_id: string):Promise<Photo[]>{
    return await this.__repository.find({
      where: {
        id: In(data_ids),
        animal:{
          id:animal_id
        }
      }
    });
  }
}
