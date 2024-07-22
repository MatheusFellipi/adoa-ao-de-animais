import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { City } from "./City.entity";

import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { ulid } from "ulid";

@Entity("addresses")
export class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  street: string;

  @Column()
  postal_code: string;

  @Column()
  district: string;

  @Column()
  complement?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city: City;

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
