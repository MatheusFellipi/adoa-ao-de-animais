import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Contact } from "./contact.entity";

import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";

@Entity("relationship_contacts")
export class RelationshipContact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.contacts)
  @Column({ nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.contacts)
  @Column({ nullable: true })
  organization?: Organization;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  link: Contact;
}
