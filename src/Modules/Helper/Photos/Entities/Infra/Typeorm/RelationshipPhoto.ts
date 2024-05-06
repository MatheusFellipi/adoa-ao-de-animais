import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Photo } from './Photos';

import { Organization } from '@Modules/Organization/Entities/Infra/Typeorm/Organization';
import { Animal } from '@Modules/Animal/Entities/Infra/Typeorm/Animal';

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
