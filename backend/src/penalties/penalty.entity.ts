import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'penalties' })
export class Penalty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  order_id: string;

  @Column({ type: 'bigint' })
  amount_cents: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ default: false })
  applied: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
