import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, OneToOne } from "typeorm";

import { Vaccination } from "./vaccination.entity";
import { VaccinationCard } from "./vaccinationCard.entity";

@Entity("relationship_vaccinations")
export class RelationshipVaccination {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  dose: string;

  @Column()
  vaccination_date: Date;

  @Column()
  crmv: string;

  @OneToOne(() => Vaccination)
  @JoinColumn({ name: "vaccination_id" })
  vaccination: Vaccination;

  @ManyToOne(() => VaccinationCard, (vaccination) => vaccination.dose)
  @JoinColumn({ name: "vaccination_card_id" })
  vaccinationCard: VaccinationCard;
}
