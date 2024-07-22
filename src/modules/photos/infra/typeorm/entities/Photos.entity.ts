import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn , UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";

import { Animal } from "@modules/animal/infra/typeorm/entities/Animal.entity";

@Entity("photos")
export class Photo {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Animal, animal => animal.photos)
  @JoinColumn({ name: "animal_id" })
  animal?: Animal;

  @Column("varchar")
  url: string;
  
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
