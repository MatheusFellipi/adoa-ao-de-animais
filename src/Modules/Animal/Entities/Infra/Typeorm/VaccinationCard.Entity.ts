import {
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Animal } from "./Animal.Entity";
import { RelationshipVaccination } from "./Relationship.Entity";

@Entity()
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
  relationshipVaccination: RelationshipVaccination[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
