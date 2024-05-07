import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IsNotEmpty } from "class-validator";

import { AnimalGender, AnimalSize } from "../../enum/animal.enum";
import { VaccinationCard } from "./vaccinationCard.entity";
import { RelationshipPhoto } from "@modules/helper/photos/entities/infra/typeorm/relationshipPhoto.entity";

@Entity("animals")
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true, default: "" })
  description: string;

  @Column({ nullable: true, default: "" })
  origin: string;

  @Column({ type: 'enum', enum: AnimalSize })
  size: AnimalSize;

  @Column({ type: 'enum', enum: AnimalGender })
  gender: AnimalGender;

  @Column({ nullable: true, default: "" })
  weight: string;

  @Column({ name: "birth_date", nullable: true})
  birthDate: Date;

  @Column({ nullable: true, default: "" })
  age: string;

  @Column({ name: "microchip_code", nullable: true, default: "" })
  microchipCode?: string;

  @OneToOne(
    () => VaccinationCard,
    (vaccinationCard) => vaccinationCard.animal,
    { cascade: true, onDelete: "CASCADE", nullable: true }
  )
  vaccinationCard?: VaccinationCard;

  @OneToMany(() => RelationshipPhoto, (relationship) => relationship.animal, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  photos: RelationshipPhoto[];
}
