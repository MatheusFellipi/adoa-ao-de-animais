import { Entity, Column, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./State.entity";
import { Address } from "./Address.entity";

@Entity("cities")
export class City {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: "state_id", referencedColumnName: "id" })
  state?: State;

  @OneToMany(() => Address, (state) => state.city)
  addresses?: Address[];
}
