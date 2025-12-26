import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'audit_logs' })
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  actor_user_id: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  target_table: string;

  @Column({ nullable: true })
  target_id: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
