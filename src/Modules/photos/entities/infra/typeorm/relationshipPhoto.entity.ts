import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Animal } from '@modules/animal/entities/infra/typeorm/animal.entity';
import { Organization } from '@modules/organization/entities/infra/typeorm/entities/organization.entity';
import { Photo } from './photos.entity';

@Entity("relationship_photo")
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
