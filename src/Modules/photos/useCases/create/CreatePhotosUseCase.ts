import { inject, injectable } from "tsyringe";

import { PhotoCreateInternalModelView, PhotoModelView } from "@modules/photos/modelView/photos";

import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";

@injectable()
export class CreatePhotosAnimalsUseCase {
  constructor(
    @inject("IPhotosRepository") private _photo_repository: IPhotosRepository
  ) { }
  async execute(form: PhotoCreateInternalModelView): Promise<PhotoModelView[]> {
    const instance = PhotoCreateInternalModelView.validade(form)
    const photos = []
    instance.photos.map(async (item) => {
      photos.push(await this._photo_repository.create({
        url: item.url,
        animal: instance.animal
      }))
    })
    return photos
  }
}
