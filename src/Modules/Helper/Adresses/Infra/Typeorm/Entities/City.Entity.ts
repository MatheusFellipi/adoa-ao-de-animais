import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { States } from "./State.Entity";

@Entity()
export class Cities {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => States, (state) => state.id)
  state: States;

  @Column("varchar")
  name: string;
}