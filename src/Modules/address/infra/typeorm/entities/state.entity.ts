import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { City } from "./city.entity";

@Entity("states")
export class State {
  @PrimaryColumn()
  id: number;

  @Column("varchar")
  acronyms: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => City, (city) => city.id)
  cities: City[];
}
