import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreatePhotosAnimalsUseCase } from "./CreatePhotosAnimalsUseCase";


export class CreatePhotosAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { age, gender, name, size, birthDate, description, microchipCode, origin, vaccinationCard, weight } = request.body;
    const files: any = request.files
    const photos = files.map(item=>({ url: item.key }))
    const use_case = container.resolve(CreatePhotosAnimalsUseCase);
    const animal = await use_case.execute({ age, gender, name, size, birthDate, description, microchipCode, origin, photos, vaccinationCard, weight });
    return response.status(201).json(animal)
  }
}

