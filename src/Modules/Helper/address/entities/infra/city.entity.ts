import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { State } from "./state.entity";

@Entity("cities")
export class City {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => State, (state) => state.id)
  state: State;

  @Column("varchar")
  name: string;
}
