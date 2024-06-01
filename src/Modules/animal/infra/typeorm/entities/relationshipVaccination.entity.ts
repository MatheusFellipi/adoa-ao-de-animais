import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from "typeorm";

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

  @OneToMany(() => Vaccination, (vaccination) => vaccination)
  vaccination: Vaccination;

  @ManyToOne(() => VaccinationCard, (vaccination) => vaccination.dose)
  vaccinationCard: VaccinationCard;
}
