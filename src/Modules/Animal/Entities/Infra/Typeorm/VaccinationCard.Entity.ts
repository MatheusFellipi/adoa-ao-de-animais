import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Animal } from "./animal.entity";
import { RelationshipVaccination } from "./relationshipVaccination.entity";

@Entity("vaccination_cards")
export class VaccinationCard {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Animal, (animal) => animal.photos, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  animal: Animal;

  @OneToMany(
    () => RelationshipVaccination,
    (relationship) => relationship.vaccinationCard,
    {
      cascade: true,
      onDelete: "CASCADE",
      nullable: true,
    }
  )
  vaccination: RelationshipVaccination[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
