import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { OrganizationType } from "@modules/organization/entities/enums/organization.enum";
import { Address } from "@modules/helper/address/infra/typeorm/entities/address.entity";

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

  @OneToMany(() => Address, (address) => address.organization, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
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
