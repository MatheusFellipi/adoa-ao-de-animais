import { inject, injectable } from "tsyringe";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class DeletePhotosUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository
  ) {}
  async execute(photos_ids: string[], animal_id: string): Promise<void> {
    if (!animal_id) throw new AppError("O id esta incorreto no parâmetro");
    const photo = await this._photo_repository.findByIdsAnimal(
      photos_ids,
      animal_id
    );
    await this._photo_repository.delete(photo);
  }
}
