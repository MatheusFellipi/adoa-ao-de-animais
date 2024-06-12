import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { IPhotosRepository } from "../../repositories/IPhotosRepository";
import { Photo } from "../entities/Photos.entity";
import { IPhotoDtos } from "@modules/photos/dtos/IPhotoDtos";

export class PhotoRepository implements IPhotosRepository {
  
  private __repository: Repository<Photo>;

  constructor() {
    this.__repository = dbContext.getRepository(Photo);
  }

  create(data: IPhotoDtos): Promise<Photo> {
    throw new Error("Method not implemented.");
  }
  
  update(data: Photo, change_data: IPhotoDtos): Promise<Photo> {
    throw new Error("Method not implemented.");
  }
  
  delete(data: Photo): Promise<void> {
    throw new Error("Method not implemented.");
  }
}