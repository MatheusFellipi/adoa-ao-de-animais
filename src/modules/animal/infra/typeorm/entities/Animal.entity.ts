import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn,
} from "typeorm";
import { ulid } from "ulid";

import { VaccinationCard } from "./VaccinationCard.entity";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { Photo } from "@modules/photos/infra/typeorm/entities/Photos.entity";


@Entity("animals")
export class Animal {
  @PrimaryColumn()
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, default: "" })
  description?: string;

  @Column({ nullable: true, default: "" })
  origin?: string;

  @Column()
  size: number;

  @Column()
  gender: number;

  @Column({ nullable: true, default: "" })
  weight?: string;

  @Column({ name: "birth_date", nullable: true })
  birthDate?: Date;

  @Column({ nullable: true, default: "" })
  age: string;

  @Column({ name: "microchip_code", nullable: true, default: "" })
  microchipCode?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => VaccinationCard, (vaccinations) => vaccinations.animal)
  @JoinColumn({ name: "vaccination_card_id" })
  vaccinationCard?: VaccinationCard;

  @ManyToOne(() => User, (user) => user.animals)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @OneToMany(() => Photo, (photo) => photo.animal)
  photos?: Photo[];

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
