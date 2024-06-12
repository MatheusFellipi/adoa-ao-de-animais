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
    return await this.__repository.save(data);
  }
  
  async update(data: Link, change_data: ILinkDtos): Promise<Link> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }
  
  async delete(data: ILinkDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id
    });
  }

  async listAllByAccountID(account_id: number): Promise<Link[]> {
    return await this.__repository.find({
      where: [
        {
          organization: {
            id: account_id,
          },
        },
        {
          user: {
            id: account_id,
          },
        },
      ],
    });
  }

  async listByID(id: number): Promise<Link> {
    return await this.__repository.findOne({
      where: { id: id },
      relations:{
        organization: true,
        user: true
      }
    });
  }
}
