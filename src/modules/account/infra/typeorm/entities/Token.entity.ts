import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Account } from './Account.entity';
import { ulid } from 'ulid';

@Entity("tokens")
export class Tokens {
  @PrimaryColumn()
  id?: string;

  @Column()
  token: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account?: Account;

  @Column({ name: 'created_at', default: () => 'now' })
  created_at: Date;

  @Column({ name: 'expires_at' })
  expires_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
