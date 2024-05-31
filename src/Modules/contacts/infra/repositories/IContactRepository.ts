import { Contact } from "../typeorm/entities/contact.entity";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";

export interface IContactRepository {
  create(data: IContactDtos): Promise<Contact>;
  createMulti(data: IContactDtos[]): Promise<Contact[]>;
}

