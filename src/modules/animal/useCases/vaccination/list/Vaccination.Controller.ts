import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListVaccinationUseCase } from "./Vaccination.UseCase";

export class ListVaccinationController {
  static async handle(request: Request, response: Response) {
    const useCase = container.resolve(ListVaccinationUseCase);
    const vaccination = await useCase.execute();
    return response.status(200).send(vaccination);
  }
}

