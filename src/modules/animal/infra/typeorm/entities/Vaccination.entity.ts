import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";

import { Dose } from "./Dose";

@Entity("vaccinations")
export class Vaccination {
  @PrimaryColumn()
  id?: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @OneToOne(() => Dose)
  doses?: Dose;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
