import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RelationshipVaccination } from "./RelationshipVaccination.entity";

@Entity("vaccinations")
export class Vaccination {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @OneToOne(() => RelationshipVaccination)
  doses?: RelationshipVaccination;
}
