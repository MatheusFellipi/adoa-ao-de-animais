import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.account, { nullable: true, cascade: true })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(() => User, (organization) => organization.account, { nullable: true, cascade: true })
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @Column({ name: "last_login", nullable: true })
  last_login: Date;
}
