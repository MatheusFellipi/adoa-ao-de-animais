import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Organization } from "@modules/organization/infra/typeorm/entities/organization.entity";

@Entity("photos")
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, organization => organization.photos)
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @Column("varchar")
  url: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
