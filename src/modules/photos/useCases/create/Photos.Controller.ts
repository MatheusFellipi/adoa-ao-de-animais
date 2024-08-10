import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreatePhotosUseCase } from "./Photos.UseCase";
import { AppError } from "@shared/utils/errors/AppError";

export class CreatePhotosController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { animal_id } = request.params;
    const files = request?.files
    if (!files) 
      throw new  AppError("Nao possui as fotos corpo da requisição")
    
    const url = files.map((item) => item.key);
    const use_case = container.resolve(CreatePhotosUseCase);
    const photos = await use_case.execute({
      url,
      animal_id,
    });
    return response.status(201).send(photos);
  }
}
