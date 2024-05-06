import {Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Link } from "./Link";

import { Organization } from "@Modules/Organization/Entities/Infra/Typeorm/Organization";
import { User } from "@Modules/User/Infra/Typeorm/Entities/Users";

@Entity()
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
