import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("photos")
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  @IsNotEmpty()
  url: string;
}
