import { container } from "tsyringe";
import { Request, Response } from "express";

import { ContactModelView } from "@modules/contacts/modelView/contact";
import { ContactCreateInternalUseCase } from "@modules/contacts/useCases/contact/ContactInternalUseCase";
import { LinkCreateUseCase } from "@modules/contacts/useCases/link/create/linksUseCase";

export class ContactCreateUseCaseController {
 static async handle(request: Request, response: Response): Promise<Response> {
    const { links } = request.body;
    const authenticateUserUseCase = container.resolve(LinkCreateUseCase);
    const token = await authenticateUserUseCase.execute(links);
    return response.status(200).json(token);
  }

  static async handleInternal(form: ContactModelView[], relation: object, key: "user" | "organization"): Promise<ContactModelView[]> {
    const create = container.resolve(ContactCreateInternalUseCase);
    return await create.execute(form, relation, key);
  }
}
