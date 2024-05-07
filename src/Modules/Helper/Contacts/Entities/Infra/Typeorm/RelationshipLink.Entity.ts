import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Link } from "./link.entity";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

@Entity("relationship_links")
export class RelationshipLink {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.links)
  @Column({ nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.links)
  @Column({ nullable: true })
  organization?: Organization;

  @ManyToOne(() => Link, { onDelete: "CASCADE" })
  link: Link;
}
