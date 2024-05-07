import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  link: string;
}
