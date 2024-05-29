import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("vaccinations")
export class Vaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;
}
