import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Organization, organization => organization.links)
  @JoinColumn({ name: "organization_id" })
  organization?: Organization;

  @ManyToOne(() => User, user => user.links)
  @JoinColumn({ name: "user_id" })
  user?: User;
}
