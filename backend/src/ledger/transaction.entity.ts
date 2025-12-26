import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  type: string; // credit|debit|reversal

  @Column({ type: 'bigint' })
  amount_cents: number;

  @Column({ nullable: true })
  related_order: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
