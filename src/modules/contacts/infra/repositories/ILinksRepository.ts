import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { Link } from "../typeorm/entities/Link.entity";

export interface ILinkRepository {
  create(data: ILinkDtos): Promise<Link>;
  update(data: Link, change_data: ILinkDtos): Promise<Link>;
  delete(data: ILinkDtos): Promise<void>;
  listAllByAccountID(account_id: string): Promise<Link[]>;
  listByID(id: string): Promise<Link>;
}
