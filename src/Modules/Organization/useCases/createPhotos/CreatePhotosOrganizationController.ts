import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreatePhotosOrganizationUseCase } from "./CreatePhotosOrganizationUseCase";


export class CreatePhotosOrganizationController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { organization } = request.account;
    const files = request?.files?.keys
    const createUserUseCase = container.resolve(CreatePhotosOrganizationUseCase);
    const token = await createUserUseCase.execute({ ...organization, photos: files });
    return response.status(201).json(token);
  }
}
