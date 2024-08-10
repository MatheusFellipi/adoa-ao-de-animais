import { inject, injectable } from "tsyringe";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { AppError } from "@shared/utils/errors/AppError";
import { PhotoModelReturn } from "@modules/photos/model/photos";

@injectable()
export class ListPhotosUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository
  ) {}
  async execute(animal_id: string): Promise<PhotoModelReturn[]> {
    if (!animal_id) throw new AppError("O id esta incorreto no parâmetro");
    const list = await this._photo_repository.listByIdAnimal(animal_id);
    return list;
  }
}
