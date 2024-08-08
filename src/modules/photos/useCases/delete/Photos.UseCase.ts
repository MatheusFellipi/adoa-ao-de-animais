import { inject, injectable } from "tsyringe";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { AppError } from "@shared/utils/errors/AppError";

@injectable()
export class CreatePhotosAnimalsUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository
  ) {}
  async execute(animal_id: string): Promise<string[]> {
    if (!animal_id) throw new AppError("O id esta incorreto no parâmetro");
    const list = await this._photo_repository.listByIdAnimal(animal_id);
    if (list.length === 0) {
      return [""];
    }
    return list?.map((item) => item.url);
  }
}
