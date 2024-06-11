import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

import { VaccinationCard } from "./VaccinationCard.entity";
import { AnimalGender, AnimalSize } from "@modules/animal/enum/animal.enum";
import { Organization } from "@modules/organization/infra/typeorm/entities/Organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { Photo } from "@modules/photos/infra/typeorm/entities/Photos.entity";

@Entity("animals")
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true, default: "" })
  description: string;

  @Column({ nullable: true, default: "" })
  origin: string;

  @Column({ type: 'enum', enum: AnimalSize })
  size: AnimalSize;

  @Column({ type: 'enum', enum: AnimalGender })
  gender: AnimalGender;

  @Column({ nullable: true, default: "" })
  weight: string;

  @Column({ name: "birth_date", nullable: true })
  birthDate: Date;

  @Column({ nullable: true, default: "" })
  age: string;

  @Column({ name: "microchip_code", nullable: true, default: "" })
  microchipCode?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Organization, organization => organization.animals)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @ManyToOne(() => User, user => user.animals)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @OneToOne(() => VaccinationCard, vaccinations => vaccinations.animal,)
  @JoinColumn({ name: "vaccination_card_id" })
  vaccinationCard: VaccinationCard

  @OneToMany(() => Organization, organization => organization.animals)
  photos?: Photo[];
}
