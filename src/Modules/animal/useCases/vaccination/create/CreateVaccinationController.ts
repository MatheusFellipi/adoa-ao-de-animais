import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateVaccinationUseCase } from "./CreateVaccinationUseCase";
import { VaccinationModelView } from "@modules/animal/modelView/vaccination";

export class CreateVaccinationController {
  static async handle(request: Request, response: Response) {}
  static async handleInternal(form: VaccinationModelView): Promise<VaccinationModelView> {
    const createVaccinationUserUseCase = container.resolve(CreateVaccinationUseCase);
    const vaccination = await createVaccinationUserUseCase.execute(form);
    return vaccination
  }
}

