import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";

import { Dose } from "./Dose.entity";
import { Animal } from "./Animal.entity";

@Entity("vaccination_cards")
export class VaccinationCard {
  @PrimaryColumn()
  id?: string;

  @OneToOne(() => Animal, (animal) => animal.vaccinationCard, { cascade: true, onDelete: "CASCADE", nullable: true })
  animal?: Animal;

  @OneToMany(() => Dose, (dose) => dose.vaccinationCard, { onDelete: "CASCADE", nullable: true })
  dose: Dose[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
