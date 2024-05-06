import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Photo } from './Photos.Entity';
import { Organization } from '@Modules/Organization/Entities/Infra/Typeorm/Organization.Entity';
import { Animal } from '@Modules/Animal/Entities/Infra/Typeorm/Animal.Entity';



@Entity()
export class RelationshipPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animal, (animal) => animal.photos)
  animal?: Animal;

  @ManyToOne(() => Organization, (organization) => organization.photos)
  organization?: Organization;

  @ManyToOne(() => Photo, { onDelete: "CASCADE" })
  photo: Photo;
}
