import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from "typeorm";
import { VaccinationCard } from "./VaccinationCard";
import { IsNotEmpty } from "class-validator";
import { Vaccination } from "./Vaccination";

@Entity()
export class RelationshipVaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  dose: string;

  @Column()
  @IsNotEmpty()
  vaccinationDate: Date;

  @Column()
  @IsNotEmpty()
  crmv: string;

  @OneToMany(() => Vaccination, (vaccinationCard) => vaccinationCard.id)
  vaccination: Vaccination;

  @ManyToOne(
    () => VaccinationCard,
    (vaccinationCard) => vaccinationCard.relationshipVaccination
  )
  vaccinationCard: VaccinationCard;
}
