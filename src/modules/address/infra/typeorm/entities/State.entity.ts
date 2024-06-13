import { Entity, Column,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { City } from "./City.entity";

@Entity("states")
export class State {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  acronyms: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => City, (city) => city.id, { cascade: true })
  cities: City[];
}
