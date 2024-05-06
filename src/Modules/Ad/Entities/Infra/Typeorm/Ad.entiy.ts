import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";

import { AnimalAdType } from "../../Enums/animalAd.enum";

import { Organization } from "@Modules/Organization/Entities/Infra/Typeorm/Organization.Entity";
import { User } from "@Modules/User/Infra/Typeorm/Entities/Users.Entity";

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
  @IsNotEmpty()
  type: AnimalAdType;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Organization, (organization) => organization)
  organization: Organization;
}
