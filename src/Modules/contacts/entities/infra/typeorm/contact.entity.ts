import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.contacts, { nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.contacts, { nullable: true })
  organization?: Organization;

  @Column()
  type: number

  @Column()
  name: string

  @Column()
  phone: string;
}
