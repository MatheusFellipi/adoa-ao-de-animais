import { container } from "tsyringe";

import { CreatePhotosAnimalsUseCase } from "./CreatePhotosUseCase";
import { PhotoModelView,PhotoCreateInternalModelView } from "@modules/photos/model/photos";

export class CreatePhotosController {
  static async handleInternal(form: PhotoCreateInternalModelView, type: "animal" | "organization"): Promise<PhotoModelView[]> {
    const use_case = container.resolve(CreatePhotosAnimalsUseCase);
    const photos = await use_case.execute({ photos: form.photos,  [type]: form.animal });
    return photos
  }
}

