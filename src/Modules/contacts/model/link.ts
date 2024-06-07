import { UserModalView } from "@modules/user/model/user";
import { OrganizationModelView } from "@modules/organization/model/organization";

export class LinkModelView {
  id: number;

  organization?: OrganizationModelView;

  user?: UserModalView;

  name: string

  url: string;

  created_at?: Date;

  updated_at?: Date;

  static validade(data: LinkModelView) {
    const instance = new LinkModelView();
    return instance
  }
}
