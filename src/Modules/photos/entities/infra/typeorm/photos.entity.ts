import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Animal } from "@modules/animal/infra/typeorm/entities/animal.entity";
import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";

@Entity("photos")
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animal, (animal) => animal.photos)
  animal?: Animal;

  @ManyToOne(() => Organization, (organization) => organization.photos)
  organization?: Organization;

  @Column("varchar")
  url: string;
}
