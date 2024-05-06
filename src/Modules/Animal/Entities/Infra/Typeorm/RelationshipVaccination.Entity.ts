import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

import { Vaccination } from "./Vaccination.Entity";
import { VaccinationCard } from "./VaccinationCard.Entity";

@Entity()
export class RelationshipVaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  dose: string;

  @Column()
  @IsNotEmpty()
  vaccination_date: Date;

  @Column()
  @IsNotEmpty()
  crmv: string;

  @OneToMany(() => Vaccination, (vaccination) => vaccination)
  vaccination: Vaccination;

  @ManyToOne(() => VaccinationCard, (vaccination) => vaccination.vaccination)
  vaccinationCard: VaccinationCard;
}
