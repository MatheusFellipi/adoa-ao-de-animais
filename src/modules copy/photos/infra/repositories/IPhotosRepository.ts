import { Photo } from "../typeorm/entities/Photos.entity";
import { IPhotoDtos } from "@modules/photos/dtos/IPhotoDtos";

export interface IPhotosRepository {
  create(data: IPhotoDtos): Promise<Photo>;
  update(data: Photo, change_data: IPhotoDtos): Promise<Photo>;
  delete(data: Photo): Promise<void>
}

