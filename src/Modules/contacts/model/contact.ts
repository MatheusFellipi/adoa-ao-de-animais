import { UserModalView } from "@modules/user/model/user";
import { OrganizationModelView } from "@modules/organization/model/organization";

export class ContactModelView {
  id?: number;

  organization?: OrganizationModelView;

  user?: UserModalView;

  type: number

  name: string

  phone: string;

  created_at?: Date
  
  updated_at?: Date

  static validade(data: ContactModelView) {
    const instance = new ContactModelView();
    return instance
  }

}
