import { container } from "tsyringe";
import { Request, Response } from "express";

import { VaccinationCardModelView } from "@modules/animal/model/vaccinationCard";
import { CreateVaccinationCardUseCase } from "./CreateVaccinationCardUseCase";

export class CreateVaccinationCardController {
  static async handle(request: Request, response: Response) {
  }
  static async handleInternal(form: VaccinationCardModelView): Promise<VaccinationCardModelView> {
    const doseUseCase = container.resolve(CreateVaccinationCardUseCase);
    return await doseUseCase.execute(form);
  }
}

