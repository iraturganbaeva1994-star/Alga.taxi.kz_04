import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_events' })
export class OrderEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  event: string;

  @Column({ nullable: true })
  actor_user_id: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
