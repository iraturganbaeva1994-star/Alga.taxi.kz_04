import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_blocks' })
export class UserBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  reason: string;

  @Column({ default: false })
  automatic: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  blocked_until: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
