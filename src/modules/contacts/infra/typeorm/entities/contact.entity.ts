import { Organization } from "@modules/organization/infra/typeorm/entities/Organization.entity";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: number

  @Column()
  name: string

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.contacts)
  @JoinColumn({ name: "user_id" })
  user?: User;
  
  @ManyToOne(() => Organization, organization => organization.contacts)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;
}
