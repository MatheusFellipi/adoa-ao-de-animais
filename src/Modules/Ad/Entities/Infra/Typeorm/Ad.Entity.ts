import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";

import { AnimalAdType } from "../../enums/animalAd.enum";

@Entity("animal_ad")
export class AnimalAd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  title: string;

  @Column("text", { nullable: false })
  @IsNotEmpty()
  description: string;

  @Column({ type: "enum", enum: AnimalAdType })
  type: AnimalAdType;
}
