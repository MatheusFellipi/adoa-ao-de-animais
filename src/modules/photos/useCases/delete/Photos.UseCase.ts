import { inject, injectable } from "tsyringe";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { configAws } from "@shared/services/aws/delete.s3";

@injectable()
export class DeletePhotosUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository
  ) {}
  async execute(photos_ids: string[], animal_id: string): Promise<void> {
    if (!animal_id) throw new AppError("O id do animal esta incorreto no parâmetro");
    if (!photos_ids||photos_ids.length === 0) throw new AppError("O id da fotos esta incorreto no parâmetro");
    const photo = await this._photo_repository.findByIdsAnimal(
      photos_ids,
      animal_id
    );

    if (process.env.NODE_ENV === "PROD")
      for (const item of photo) {
        configAws.delete(item.url);
      }
      
    await this._photo_repository.delete(photo);
  }
}
