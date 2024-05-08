import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsPostalCode } from "class-validator";

import { City } from "./city.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city: City;

  @Column()
  @IsNotEmpty()
  street: string;

  @Column()
  @IsNotEmpty()
  @IsPostalCode()
  postal_code: string;

  @Column()
  @IsNotEmpty()
  district: string;

  @Column("text")
  @IsNotEmpty()
  complement: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
