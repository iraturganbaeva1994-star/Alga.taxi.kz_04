import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications_log' })
export class NotificationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  to_phone: string;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  channel: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ nullable: true })
  provider_status: string;

  @Column({ type: 'jsonb', nullable: true })
  provider_response: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
