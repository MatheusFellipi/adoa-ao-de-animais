import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Photo } from "@modules/photos/infra/typeorm/entities/photos.entity";
import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { Account } from "@modules/account/infra/typeorm/entities/Account.Entity";
import { Contact } from "@modules/contacts/infra/typeorm/entities/contact.entity";
import { Link } from "@modules/contacts/infra/typeorm/entities/link.entity";


@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  type: number;

  @Column({ unique: true, nullable: false, length: 14 })
  cnpj_cpf: string;

  @Column({ nullable: true })
  operation_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => Photo, photo => photo.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  photos: Photo[];

  @OneToMany(() => Address, address => address.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  addresses: Address[];

  @OneToMany(() => Account, account => account.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  accounts: Account[];

  @OneToMany(() => Animal, animal => animal.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  animals: Animal[];
  
  @OneToMany(() => Contact, contact => contact.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  contacts: Contact[];

  @OneToMany(() => Link, link => link.organization, { cascade: true, nullable: true, onDelete: "CASCADE" })
  links: Link[];
}
