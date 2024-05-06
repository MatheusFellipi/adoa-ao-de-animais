import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsEnum, IsNotEmpty,Length } from "class-validator";
import { OrganizationType } from "../../Enums/OrganizationType";

import { RelationshipAddress } from "@Modules/Helper/Adresses/Infra/Typeorm/Entities/RelationshipAddress";
import { RelationshipContact } from "@Modules/Helper/Contacts/Entities/Infra/Typeorm/RelationshipContacts";
import { RelationshipLink } from "@Modules/Helper/Contacts/Entities/Infra/Typeorm/RelationshipLink";
import { RelationshipPhoto } from "@Modules/Helper/Photos/Entities/Infra/Typeorm/RelationshipPhoto";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @Column("text", { nullable: false })
  @IsNotEmpty()
  @Length(1, 2000)
  description: string;

  @Column({ unique: true, nullable: false,})
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @Column({ type: "enum", enum: OrganizationType, nullable: false })
  @IsEnum(OrganizationType)
  @IsNotEmpty()
  type: OrganizationType;

  @Column("varchar", { unique: true, nullable: false, length: 14})
  @IsNotEmpty()
  @Length(11, 14)
  cnpjCpf: string;

  @OneToMany(() => RelationshipPhoto, (photo) => photo.organization, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  photos?: RelationshipPhoto[];

  @OneToMany(() => RelationshipLink, (link) => link.organization, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  links?: RelationshipLink[];

  @OneToMany(() => RelationshipContact, (contact) => contact.organization, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  contacts?: RelationshipContact[];

  @OneToMany(() => RelationshipAddress, (address) => address.organization, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  addresses: RelationshipAddress[];
}
