import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account.entity';


@Entity("tokens")
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @Column({ name: 'created_at', default: () => 'now' })
  created_at: Date;

  @Column({ name: 'expires_at' })
  expires_at: Date;
}
