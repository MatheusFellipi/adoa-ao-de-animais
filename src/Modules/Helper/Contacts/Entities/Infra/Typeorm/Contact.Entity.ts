import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  @IsNotEmpty()
  phone: string;
}
