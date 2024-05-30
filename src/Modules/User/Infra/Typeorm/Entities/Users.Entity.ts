import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, } from "typeorm";

import { Link } from "@modules/contacts/entities/infra/typeorm/link.entity";
import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { Photo } from "@modules/photos/infra/typeorm/entities/photos.entity";
import { Account } from "@modules/account/entities/infra/typeorm/Account.Entity";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { Contact } from "@modules/contacts/entities/infra/typeorm/contact.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, })
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, address => address.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  addresses: Address[];

  @OneToMany(() => Account, account => account.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  accounts: Account[];

  @OneToMany(() => Animal, animal => animal.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  animals: Animal[];
  
  @OneToMany(() => Contact, contact => contact.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  contacts: Contact[];

  @OneToMany(() => Link, link => link.user, { cascade: true, nullable: true, onDelete: "CASCADE" })
  links: Link[];
}
