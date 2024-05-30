import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { RelationshipVaccination } from "./relationshipVaccination.entity";
import { Animal } from "./animal.entity";

@Entity("vaccination_cards")
export class VaccinationCard {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => RelationshipVaccination, (relationship) => relationship.vaccinationCard, { cascade: true, onDelete: "CASCADE", nullable: true})
  vaccination: RelationshipVaccination[];
  
  @OneToOne(() => Animal, (animal) => animal.vaccinationCard, { cascade: true, onDelete: "CASCADE", nullable: true})
  animal: Animal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
