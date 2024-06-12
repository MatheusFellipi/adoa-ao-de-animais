import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteAnimalsUseCase } from "./deleteAnimalsUseCase";


export class DeleteAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const createUserUseCase = container.resolve(DeleteAnimalsUseCase);
    await createUserUseCase.execute(parseInt(id));
    return response.status(201).send("Os dados foram deletado do sistema")
  }
}

