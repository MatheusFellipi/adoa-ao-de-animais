import { Repository } from "typeorm";
import { dbContext } from "@shared/infra/typeorm"
import { Contact } from "../entities/contact.entity";


import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";
import { IContactRepository } from "../../repositories/IContactRepository";

export class ContactRepository implements IContactRepository {
  private __repository: Repository<Contact>;

  constructor() {
    this.__repository = dbContext.getRepository(Contact);
  }

  async createMulti(data: IContactDtos[]): Promise<Contact[]> {
    const contacts: Contact[] = [];
    for (const item of data) {
      const contact = this.__repository.create(item);
      contacts.push(await this.__repository.save(contact));
    }
    return contacts;
  }

  async create(data: IContactDtos): Promise<Contact> {
    const user = this.__repository.create(data);
    return await this.__repository.save(user);
  }

}