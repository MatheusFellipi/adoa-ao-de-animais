import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@modules/user/infra/typeorm/entities/users.entity";
import { Organization } from "@modules/organization/entities/infra/typeorm/entities/organization.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.contacts, { nullable: true })
  user?: User;

  @OneToMany(() => Organization, (organization) => organization.contacts, { nullable: true })
  organization?: Organization;

  @Column()
  phone: string;
}
