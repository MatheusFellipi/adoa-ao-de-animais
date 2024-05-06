import {Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Address } from "./Address";

import { Organization } from "@Modules/Organization/Entities/Infra/Typeorm/Organization";
import { User } from "@Modules/User/Infra/Typeorm/Entities/Users";

@Entity()
export class RelationshipAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.contacts)
  @Column({ nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.contacts)
  @Column({ nullable: true })
  organization?: Organization;

  @ManyToOne(() => Address, { onDelete: "CASCADE" })
  address: Address;
}
