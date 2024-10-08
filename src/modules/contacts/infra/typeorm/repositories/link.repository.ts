import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";

import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";

import { Link } from "../entities/Link.entity";
import { ILinkRepository } from "../../repositories/ILinksRepository";

export class LinkRepository implements ILinkRepository {
  private __repository: Repository<Link>;

  constructor() {
    this.__repository = dbContext.getRepository(Link);
  }

  async create(data: ILinkDtos): Promise<Link> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async update(data: Link, change_data: ILinkDtos): Promise<Link> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }

  async delete(data: ILinkDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async listAllByAccountID(account_id: string): Promise<Link[]> {
    return await this.__repository.find({
      where: [
        {
          user: {
            id: account_id,
          },
        },
      ],
    });
  }

  async listByID(id: string): Promise<Link> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }
}
