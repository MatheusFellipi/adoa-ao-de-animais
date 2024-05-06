import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vaccination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  @IsNotEmpty()
  name: string;

  @Column("varchar")
  @IsNotEmpty()
  description: string;
}
