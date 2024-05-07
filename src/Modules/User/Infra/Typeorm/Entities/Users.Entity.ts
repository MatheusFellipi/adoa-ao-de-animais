import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";

import { RelationshipLink } from "@modules/helper/contacts/entities/infra/typeorm/relationshipLink.entity";
import { RelationshipContact } from "@modules/helper/contacts/entities/infra/typeorm/relationshipContacts.entity";
import { RelationshipAddress } from "@modules/helper/address/entities/infra/relationshipAddress.entity";
import { AnimalAd } from "@modules/ad/entities/infra/typeorm/ad.entity";


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
