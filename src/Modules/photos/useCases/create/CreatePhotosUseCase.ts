import { inject, injectable } from "tsyringe";

import { PhotoModelView } from "@modules/photos/modelView/photos";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";

@injectable()
export class CreatePhotosAnimalsUseCase {
  constructor(
    @inject("IPhotoRepository") private _photo_repository: IPhotosRepository
  ) { }

  async execute(form: PhotoModelView): Promise<PhotoModelView[]> {
    const instance = PhotoModelView.validade(form)
    const photos = []
    instance.url.map(async (item) => {
      photos.push(await this._photo_repository.create({
        url: item,
        animal: instance.animal
      }))
    })
    return photos
  }
}
