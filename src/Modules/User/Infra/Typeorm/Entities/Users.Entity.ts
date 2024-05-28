import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";


import { Account } from "@modules/account/entities/infra/typeorm/account.entity";
import { Contact } from "@modules/contacts/entities/infra/typeorm/contact.entity";
import { Link } from "@modules/contacts/entities/infra/typeorm/link.entity";
import { Address } from "@modules/address/infra/typeorm/entities/address.entity";

@Entity({name:"users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column("varchar", {
    nullable: false,
  })
  avatar?: string;

  @OneToOne(() => Contact, (contact) => contact.organization, { cascade: true, onDelete: "CASCADE", nullable: false, })
  account: Account;

  @OneToMany(() => Contact, (contact) => contact.organization, { cascade: true, onDelete: "CASCADE", nullable: true })
  contacts: Contact[];

  @OneToMany(() => Link, (link) => link.organization, { cascade: true, onDelete: "CASCADE", nullable: true })
  links: Link[];

  @OneToMany(() => Address, (address) => address.user, { cascade: true, onDelete: "CASCADE", nullable: true,})
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
