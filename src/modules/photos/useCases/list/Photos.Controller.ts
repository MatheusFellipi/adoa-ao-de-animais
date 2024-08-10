import { container } from "tsyringe";

import { Request, Response } from "express";
import { ListPhotosUseCase } from "@modules/photos/useCases/list/Photos.UseCase";

export class ListPhotosController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { animal_id } = request.params;
    const contact = container.resolve(ListPhotosUseCase);
    const data = await contact.execute(animal_id as string);
    return response.status(200).json(data);
  }
}
