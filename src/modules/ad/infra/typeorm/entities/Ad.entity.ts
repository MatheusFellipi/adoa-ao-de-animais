import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";
import { ulid } from "ulid";

@Entity("animal_ad")
export class AnimalAd {
  @PrimaryColumn()
  id?: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  title: string;

  @Column("text", { nullable: false })
  description: string;

  @Column("text", { nullable: false })
  extra: string;

  @Column()
  type: number;

  @OneToOne(() => Animal, animal => animal)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;
  
  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
