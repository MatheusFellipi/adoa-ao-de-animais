import { Contact } from "../typeorm/entities/Contact.entity";
import { IContactDtos } from "@modules/contacts/dtos/IContactDtos";

export interface IContactRepository {
  create(data: IContactDtos): Promise<Contact>;
  update(data: Contact, change_data: IContactDtos): Promise<Contact>;
  delete(data: IContactDtos): Promise<void>;
  listAllByAccountID(account_id: string): Promise<Contact[]>;
  listByID(id: string): Promise<Contact>;
}

