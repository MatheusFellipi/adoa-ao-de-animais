import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateDoseUseCase } from "./Dose.UseCase";

export class CreateDoseController {
  static async handle(request: Request, response: Response) {
    const {
      description,
      vaccination_date,
      crmv,
      vaccination,
      vaccination_card_id,
    } = request.body;
    const doseUseCase = container.resolve(CreateDoseUseCase);
    const dose = await doseUseCase.execute({
      description,
      vaccination_date,
      crmv,
      vaccination,
      vaccination_card_id,
    });

    return response.status(201).send(dose);
  }
}
