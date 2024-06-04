import { UserModalView } from "@modules/user/modelView/user";
import { OrganizationModelView } from "@modules/organization/modelView/organization";

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
