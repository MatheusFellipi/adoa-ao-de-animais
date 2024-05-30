import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";


@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Organization, organization => organization.accounts)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @ManyToOne(() => User, user => user.accounts)
  @JoinColumn({ name: "user_id" })
  user: User;
  
  @Column()
  password: string;

  @Column({ name: "last_login", nullable: true })
  last_login: Date;
}
