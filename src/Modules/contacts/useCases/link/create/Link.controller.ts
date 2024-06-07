import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLinkUseCase } from "./Links.useCase";

export class CreateLinkController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const type = request.type;
    const account = request.account[type];
    const link = container.resolve(CreateLinkUseCase);
    const data = await link.execute({
      name,
      url,
      [type]: account,
    });
    return response.status(200).json(data);
  }
}
