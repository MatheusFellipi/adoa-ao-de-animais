import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLinkUseCase } from "./Links.useCase";

export class CreateLinkController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, url } = request.body;
    const account = request.account[request.type];
    const link = container.resolve(CreateLinkUseCase);
    const data = await link.execute({
      name,
      url,
      [request.type]: account,
    });
    return response.status(201).json(data);
  }
}
