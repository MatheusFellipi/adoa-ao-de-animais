import { container } from "tsyringe";

import { CreatePhotosAnimalsUseCase } from "./CreatePhotosUseCase";
import { PhotoModelView } from "@modules/photos/modelView/photos";

export class CreatePhotosController {
  static async handleInternal(form: PhotoModelView, type: "animal" | "organization"): Promise<PhotoModelView[]> {
    const use_case = container.resolve(CreatePhotosAnimalsUseCase);
    const photos = await use_case.execute({ url: form.url,  [type]: form.animal });
    return photos
  }
}

