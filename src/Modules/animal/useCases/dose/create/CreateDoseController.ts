import { container } from "tsyringe";
import { Request, Response } from "express";

import { DoseModelView } from "@modules/animal/modelView/doseModelView";
import { CreateDoseUseCase } from "./CreateDoseUseCase";

export class CreateDoseController {
  static async handle(request: Request, response: Response) {}

  static async handleInternal(form: DoseModelView[]): Promise<DoseModelView[]> {
    const doseUseCase = container.resolve(CreateDoseUseCase);
    return await doseUseCase.execute(form);
  }
}

