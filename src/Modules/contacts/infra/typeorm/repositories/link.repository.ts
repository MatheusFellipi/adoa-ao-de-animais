import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"

import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";

import { Link } from "../entities/link.entity";
import { ILinkRepository } from "../../repositories/ILinksRepository";

export class LinkRepository implements ILinkRepository {
  private __repository: Repository<Link>;

  constructor() {
    this.__repository = dbContext.getRepository(Link);
  }

  async createMulti(data: ILinkDtos[]): Promise<Link[]> {
    const links: Link[] = [];
    for (const item of data) {
      const link = this.__repository.create(item);
      links.push(await this.__repository.save(link));
    }
    return links;
  }

  async create(data: ILinkDtos): Promise<Link> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

}