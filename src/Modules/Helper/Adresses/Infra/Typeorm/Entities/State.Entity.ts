import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Cities } from "./City.Entity";

@Entity()
export class States {
  @PrimaryColumn()
  id: number;

  @Column("varchar")
  acronyms: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Cities, (city) => city.id)
  city: Cities[];
}