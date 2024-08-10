import { Photo } from "../typeorm/entities/Photos.entity";
import { IPhotoDtos } from "@modules/photos/dtos/IPhotoDtos";

export interface IPhotosRepository {
  create(data: IPhotoDtos): Promise<Photo>;
  listByIdAnimal(id: string): Promise<Photo[]>;
  update(data: Photo, change_data: IPhotoDtos): Promise<Photo>;
  delete(photos: Photo[]): Promise<void>;
  findByIdsAnimal(data_ids: string[], animal_id: string): Promise<Photo[]>
}