import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { IsEmail } from "class-validator";

import { RelationshipContact } from "@Modules/Helper/Contacts/Entities/Infra/Typeorm/Relationship_Contacts.Entity";
import { RelationshipLink } from "@Modules/Helper/Contacts/Entities/Infra/Typeorm/Relationship_Link.Entity";
import { RelationshipAddress } from "@Modules/Helper/Adresses/Infra/Typeorm/Entities/Relationship_Address.Entity";
import { AnimalAd } from "@Modules/Ad/Entities/Infra/Typeorm/Ad.entiy";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    unique: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column("varchar", {
    nullable: false,
  })
  avatar?: string;

  @OneToMany(() => RelationshipLink, (link) => link.user, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  links?: RelationshipLink[];

  @OneToMany(() => RelationshipContact, (contacts) => contacts.user, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  contacts?: RelationshipContact[];

  @OneToMany(() => RelationshipAddress, (address) => address.user, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  addresses: RelationshipAddress[];

  @OneToMany(() => AnimalAd, (animalAd) => animalAd.user)
  animal_ads?: AnimalAd[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
