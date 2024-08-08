import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, OneToOne } from "typeorm";

import { VaccinationCard } from "./VaccinationCard.entity";
import { Vaccination } from "./Vaccination.entity";
import { ulid } from "ulid";

@Entity("Dose")
export class Dose {
  @PrimaryColumn()
  id?: string;

  @Column()
  dose: string;

  @Column()
  vaccination_date: Date;

  @Column()
  crmv: string;

  @OneToOne(() => Vaccination)
  @JoinColumn({ name: "vaccination_id" })
  vaccination?: Vaccination;

  @ManyToOne(() => VaccinationCard, (vaccination) => vaccination.dose)
  @JoinColumn({ name: "vaccination_card_id" })
  vaccinationCard?: VaccinationCard;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
