import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("photos")
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, organization => organization.photos)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @Column("varchar")
  url: string;
}
