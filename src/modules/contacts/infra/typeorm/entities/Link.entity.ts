import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";

import { User } from "@modules/user/infra/typeorm/entities/Users.entity";

@Entity("links")
export class Link {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string

  @Column()
  url: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, user => user.links)
  @JoinColumn({ name: "user_id" })
  user?: User;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
