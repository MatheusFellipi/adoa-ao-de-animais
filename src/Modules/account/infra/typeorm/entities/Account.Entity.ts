import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Organization, organization => organization.accounts)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @OneToOne(() => User, user => user.account)
  @JoinColumn({ name: "user_id" })
  user?: User;
  
  @Column()
  password: string;

  @Column({ name: "last_login", nullable: true })
  last_login: Date;
}
