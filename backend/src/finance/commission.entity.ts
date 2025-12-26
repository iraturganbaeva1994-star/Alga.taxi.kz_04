import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commission_rules' })
export class CommissionRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  scope: string; // 'global'|'service'|'driver'

  @Column({ nullable: true })
  service_type: string;

  @Column({ nullable: true })
  driver_id: string;

  @Column('numeric')
  percent: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;
}
