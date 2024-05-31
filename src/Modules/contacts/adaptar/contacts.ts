
import { ContactModelView } from "../modelView/contact";


export class AdaptarContact {
  static contactReturn(contact: ContactModelView[]): ContactModelView[] {
    return contact.map((item)=>(
      {
        id: item.id,
        type: item.type,
        phone: item.phone,
        name: item.name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }
    ))
  }
}
