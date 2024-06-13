import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddressUseCase } from "./City.UseCase";

export class CiteCreateController {
 static async handle(): Promise<void> {
    const authenticateUserUseCase = container.resolve(AddressUseCase);
    const token = await authenticateUserUseCase.execute();
    return
  }
}
