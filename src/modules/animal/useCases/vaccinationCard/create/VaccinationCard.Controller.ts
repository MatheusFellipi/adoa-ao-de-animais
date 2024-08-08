import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateVaccinationCardUseCase } from "./VaccinationCard.UseCase";

export class CreateVaccinationCardController {
  static async handle(request: Request, response: Response) {
    const { animal_id, dose } = request.body;
    const doseUseCase = container.resolve(CreateVaccinationCardUseCase);
    const card = await doseUseCase.execute(
      {
        dose,
      },
      animal_id
    );
    return response.status(201).send(card);
  }
}
