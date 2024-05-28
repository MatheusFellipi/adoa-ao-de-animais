import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Address } from "@modules/address/infra/typeorm/entities/address.entity";
import { Contact } from "@modules/contacts/entities/infra/typeorm/contact.entity";
import { Link } from "@modules/contacts/entities/infra/typeorm/link.entity";
import { OrganizationType } from "@modules/organization/enums/organization.enum";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column("text", { nullable: false })
  description: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: "enum", enum: OrganizationType, nullable: false })
  type: OrganizationType;

  @OneToMany(() => Contact, (contact) => contact.organization, { cascade: true, onDelete: "CASCADE", nullable: true })
  contacts: Contact[];

  @OneToMany(() => Link, (link) => link.organization, { cascade: true, onDelete: "CASCADE", nullable: true })
  links: Link[];

  @OneToMany(() => Address, (address) => address.user, { cascade: true, onDelete: "CASCADE", nullable: true,})
  addresses: Address[];

  @Column("varchar", { unique: true, nullable: false, length: 14 })
  cnpj_cpf: string;

  @Column({ nullable: true })
  operation_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
