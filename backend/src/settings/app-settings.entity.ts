import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'app_settings' })
export class AppSetting {
  @PrimaryColumn()
  key: string;

  @Column({ type: 'jsonb', nullable: true })
  value: any;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}
