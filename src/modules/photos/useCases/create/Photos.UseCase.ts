import { inject, injectable } from "tsyringe";
import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { PhotoModel, PhotoModelReturn } from "@modules/photos/model/photos";
import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { configAws } from "@shared/services/aws/delete.s3";

@injectable()
export class CreatePhotosUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository,
    @inject("IAnimalRepository") private _repository_animal: IAnimalRepository
  ) {}

  async execute(form: PhotoModel): Promise<PhotoModelReturn[]> {
    const url_host = "http://host/";
    const instance = await PhotoModel.validade(form);
    const animal = await this._repository_animal.findById(instance.animal_id);
    if (!animal) {
      if (process.env.NODE_ENV === "PROD")
        for (const item of instance.url) {
          configAws.delete(item);
        }
      throw new AppError("Nao e possível salvar as img ");
    }

    const photos: PhotoModelReturn[] = [];
    for (const item of instance.url) {
      const photo_save = await this._photo_repository.create({
        url: item,
        animal,
      });
      photo_save.url = url_host + photo_save.url;
      photos.push(photo_save);
    }
    return photos;
  }
}
