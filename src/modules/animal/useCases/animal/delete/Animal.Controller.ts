import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteAnimalsUseCase } from "@modules/animal/useCases/animal/delete/Animal.UseCase";



export class DeleteAnimalController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const createUserUseCase = container.resolve(DeleteAnimalsUseCase);
    await createUserUseCase.execute(id);
    return response.status(204).send()
  }
}

