import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { IsNotEmpty, IsPostalCode } from "class-validator";

import { Cities } from "./City.Entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cities, (city) => city.id)
  city: Cities;

  @Column("varchar")
  @IsNotEmpty()
  street: string;

  @Column("varchar")
  @IsNotEmpty()
  @IsPostalCode()
  postal_code: string;

  @Column("varchar")
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
