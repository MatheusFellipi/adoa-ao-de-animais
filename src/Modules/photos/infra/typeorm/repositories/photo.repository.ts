import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IPhotosRepository } from "../../repositories/IPhotosRepository";
import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";
import { Photo } from "../entities/photos.entity";

export class PhotoRepository implements IPhotosRepository {
  
  private __repository: Repository<Photo>;

  constructor() {
    this.__repository = dbContext.getRepository(Photo);
  }

  create(data: IAnimalDtos): Promise<Photo> {
    throw new Error("Method not implemented.");
  }
  
  update(data: Photo, change_data: IAnimalDtos): Promise<Photo> {
    throw new Error("Method not implemented.");
  }
  
  delete(data: Photo): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  findById(id: number): Promise<Photo> {
    throw new Error("Method not implemented.");
  }
  
  findByIdFullReturn(id: number): Promise<Photo> {
    throw new Error("Method not implemented.");
  }

}