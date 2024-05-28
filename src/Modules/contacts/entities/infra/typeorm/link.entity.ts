import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.links, { nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.links, { nullable: true })
  organization?: Organization;

  @Column()
  link: string;
}
