import { Request, Response } from "express";
import { container } from "tsyringe";

import { LinkModelView } from "@modules/contacts/model/link";
import { LinkCreateInternalUseCase } from "@modules/contacts/useCases/link/create/linksInternalUseCase";
import { LinkCreateUseCase } from "@modules/contacts/useCases/link/create/linksUseCase";

export class LinkCreateUseCaseController {
 static async handle(request: Request, response: Response): Promise<Response> {
    const { links } = request.body;
    const link = container.resolve(LinkCreateUseCase);
    const data = await link.execute(links);
    return response.status(200).json(data);
  }

  static async handleInternal(form: LinkModelView[], relation: object, key: "user" | "organization"): Promise<LinkModelView[]> {
    const create = container.resolve(LinkCreateInternalUseCase);
    return await create.execute(form, relation, key);
  }
}
