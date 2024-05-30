import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, } from "typeorm";

import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { Account } from "@modules/account/infra/typeorm/entities/Account.Entity";
import { Contact } from "@modules/contacts/infra/typeorm/entities/contact.entity";
import { Link } from "@modules/contacts/infra/typeorm/entities/link.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  name: string;

  @Column({ nullable: false, })
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, address => address.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  addresses: Address[];

  @OneToOne(() => Account, account => account.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  account: Account;

  @OneToMany(() => Animal, animal => animal.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  animals: Animal[];
  
  @OneToMany(() => Contact, contact => contact.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  contacts: Contact[];

  @OneToMany(() => Link, link => link.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  links: Link[];
}
