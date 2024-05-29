import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { City } from "./city.entity";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city: City;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.addresses)
  @JoinColumn({ name: "organization_id", referencedColumnName: "id" })
  organization: Organization;
  
  @Column()
  street: string;

  @Column()
  postal_code: string;

  @Column()
  district: string;

  @Column("text")
  complement: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
