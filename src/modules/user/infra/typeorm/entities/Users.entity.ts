import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Address } from "@modules/address/infra/typeorm/entities/Address.entity";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";
import { Contact } from "@modules/contacts/infra/typeorm/entities/Contact.entity";
import { Link } from "@modules/contacts/infra/typeorm/entities/Link.entity";
import { ulid } from "ulid";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  avatar?: string;

  @Column({ nullable: false })
  description?: string;

  @Column({ nullable: false })
  type: number;

  @Column({ unique: true, nullable: false, length: 14 })
  cnpj_cpf: string;

  @Column({ nullable: true })
  operation_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Address, (address) => address.user, { cascade: true, onDelete: "CASCADE" })
  addresses?: Address[];

  @OneToOne(() => Account, (account) => account.user, { cascade: true, onDelete: "CASCADE" })
  account?: Account;

  @OneToMany(() => Animal, (animal) => animal.user, { cascade: true, onDelete: "CASCADE" })
  animals?: Animal[];

  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true, onDelete: "CASCADE" })
  contacts?: Contact[];

  @OneToMany(() => Link, (link) => link.user, { cascade: true, onDelete: "CASCADE" })
  links?: Link[];

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
