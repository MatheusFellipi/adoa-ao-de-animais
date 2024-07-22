import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreatePhotosAnimalsUseCase } from "./CreatePhotosAnimalsUseCase";


export class CreatePhotosAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const files: any = request.files
    const { animal_id } = request.params
    const photos = files.map(item => ({ url: item.key }))
    const use_case = container.resolve(CreatePhotosAnimalsUseCase);
    const animal = await use_case.execute({ animal_id, photos });
    return response.status(201).json(animal)
  }
}

