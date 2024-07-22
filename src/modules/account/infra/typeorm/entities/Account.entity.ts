import { Entity, Column, JoinColumn, ManyToOne, OneToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Tokens } from "./Token.entity";

import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { ulid } from "ulid";


@Entity("accounts")
export class Account {
  @PrimaryColumn()
  id?: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, user => user.account)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Tokens, t => t.account)
  token?: Tokens[];
  
  @Column({ name: "last_login", nullable: true })
  last_login?: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
