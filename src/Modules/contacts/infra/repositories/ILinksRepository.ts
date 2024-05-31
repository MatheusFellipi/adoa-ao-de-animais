import { ILinkDtos } from "@modules/contacts/dtos/ILinkDtos";
import { Link } from "../typeorm/entities/link.entity";

export interface ILinkRepository {
  create(data: ILinkDtos): Promise<Link>;
  createMulti(data: ILinkDtos[]): Promise<Link[]>;
}

