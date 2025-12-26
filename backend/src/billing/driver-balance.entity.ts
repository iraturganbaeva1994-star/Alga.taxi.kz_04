import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'driver_balances' })
export class DriverBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  driver_id: string;

  @Column({ type: 'bigint', default: 0 })
  balance_cents: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}
