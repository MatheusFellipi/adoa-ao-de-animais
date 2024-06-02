import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { RelationshipVaccination } from "./relationshipVaccination.entity";
import { Animal } from "./animal.entity";

@Entity("vaccination_cards")
export class VaccinationCard {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Animal, (animal) => animal.vaccinationCard, { cascade: true, onDelete: "CASCADE", nullable: true })
  animal: Animal;

  @OneToMany(() => RelationshipVaccination, (relationship) => relationship.vaccinationCard, { onDelete: "CASCADE", nullable: true })
  dose: RelationshipVaccination[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
