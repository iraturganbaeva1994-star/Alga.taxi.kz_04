import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'driver_activity' })
export class DriverActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  driver_id: string;

  @Column()
  event: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
