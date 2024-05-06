import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Organization } from "@Modules/Organization/Entities/Infra/Typeorm/Organization";
import { User } from "@Modules/User/Infra/Typeorm/Entities/Users";

@Entity()
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
