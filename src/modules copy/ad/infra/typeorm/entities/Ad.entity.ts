import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { AnimalAdType } from "@modules/ad/enums/animalAd.enum";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";

@Entity("animal_ad")
export class AnimalAd {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  title: string;

  @Column("text", { nullable: false })
  description: string;

  @Column("text", { nullable: false })
  extra: string;

  @Column({ type: "enum", enum: AnimalAdType })
  type: AnimalAdType;

  @OneToOne(() => Animal, animal => animal)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;
}
