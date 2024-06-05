import { IAnimalDtos } from "@modules/animal/dtos/IAnimalDtos";
import { Photo } from "../typeorm/entities/photos.entity";
import { IPhotoDtos } from "@modules/photos/dtos/IPhotoDtos";

export interface IPhotosRepository {
  create(data: IPhotoDtos): Promise<Photo>;
  update(data: Photo, change_data: IPhotoDtos): Promise<Photo>;
  delete(data: Photo): Promise<void>
  findById(id: number): Promise<Photo>;
  findByIdFullReturn(id: number): Promise<Photo>;
}

