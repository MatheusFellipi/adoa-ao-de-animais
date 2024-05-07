import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";

import { AnimalAdType } from "../../enums/animalAd.enum";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

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
