import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expires_at: Date;

  constructor() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}
