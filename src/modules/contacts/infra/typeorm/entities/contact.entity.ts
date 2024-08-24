import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ulid } from "ulid";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";

@Entity("contacts")
export class Contact {
  @PrimaryColumn()
  id: string;

  @Column()
  type: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.contacts)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
