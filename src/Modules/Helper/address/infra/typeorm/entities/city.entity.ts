import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { State } from "./state.entity";
import { Address } from "./address.entity";

@Entity("cities")
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: "state_id", referencedColumnName: "id" })
  state?: State;

  @OneToMany(() => Address, (state) => state.city)
  address: Address[];
}
