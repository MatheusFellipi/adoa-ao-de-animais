import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm";
import { Contact } from "../entities/Contact.entity";

import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { IContactRepository } from "../../repositories/IContactRepository";

export class ContactRepository implements IContactRepository {
  private __repository: Repository<Contact>;

  constructor() {
    this.__repository = dbContext.getRepository(Contact);
  }

  async create(data: IContactDtos): Promise<Contact> {
    return await this.__repository.save(this.__repository.create(data));
  }

  async update(data: Contact, change_data: IContactDtos): Promise<Contact> {
    this.__repository.merge(data, change_data);
    return await this.__repository.save(data);
  }

  async delete(data: IContactDtos): Promise<void> {
    await this.__repository.delete({
      id: data.id,
    });
  }

  async listAllByAccountID(account_id: string): Promise<Contact[]> {
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

  async listByID(id: string): Promise<Contact> {
    return await this.__repository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }
}
