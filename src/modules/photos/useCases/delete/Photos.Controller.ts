import { container } from "tsyringe";

import { Request, Response } from "express";
import { DeletePhotosUseCase } from "@modules/photos/useCases/delete/Photos.UseCase";

export class DeletePhotosController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { animal_id } = request.params;
    const { photos_ids } = request.body;
    const contact = container.resolve(DeletePhotosUseCase);
    const data = await contact.execute(photos_ids, animal_id);
    return response.status(204).json(data);
  }
}
