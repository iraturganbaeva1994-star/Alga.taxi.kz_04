import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppSettingsController } from './settings/app-settings.controller';
import { AppSettingsService } from './settings/app-settings.service';
import { AppSetting } from './settings/app-settings.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './shared/roles.guard';
import { CommissionRule } from './finance/commission.entity';
import { CommissionService } from './finance/commission.service';
import { CommissionController } from './finance/commission.controller';
import { DriverBalance } from './billing/driver-balance.entity';
import { UserBlock } from './blocks/blocks.entity';
import { BlocksService } from './blocks/blocks.service';
import { BlocksController } from './blocks/blocks.controller';
import { Penalty } from './penalties/penalty.entity';
import { PenaltyService } from './penalties/penalty.service';
import { PenaltyController } from './penalties/penalty.controller';
import { AuditLog } from './audit/audit.entity';
import { AuditService } from './audit/audit.service';
import { AuditController } from './audit/audit.controller';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'alga',
      autoLoadEntities: true,
      synchronize: false
    }),
    TypeOrmModule.forFeature([AppSetting, CommissionRule, DriverBalance, UserBlock, Penalty, AuditLog, Transaction, OrderEvent, DriverActivity, NotificationLog]),
    AuthModule
  ],
  controllers: [AppSettingsController, CommissionController, BlocksController, PenaltyController, AuditController, TransactionController, OrderEventController, UsersController],
  providers: [AppSettingsService, RolesGuard, CommissionService, BlocksService, PenaltyService, AuditService, TransactionService, OrderEventService]
})
export class AppModule {}
