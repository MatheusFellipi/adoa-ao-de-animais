import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Address } from "@modules/helper/address/infra/typeorm/entities/address.entity";

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

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  addresses: Address[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
