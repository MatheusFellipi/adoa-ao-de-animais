import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @Column({ name: "last_login", nullable: true })
  lastLogin: Date;
}
