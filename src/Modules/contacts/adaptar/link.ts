import { Link } from "../infra/typeorm/entities/link.entity";
import { LinkModelView } from "../modelView/link";


export class AdaptarLink {
  static linkReturn(link: Link[]): LinkModelView[] {
    return link.map((item)=>(
      {
        id: item.id,
        link: item.link,
        name: item.name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }
    ))
  }
}
