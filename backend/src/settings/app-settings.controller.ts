import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/settings')
@UseGuards(RolesGuard)
export class AppSettingsController {
  constructor(private svc: AppSettingsService) {}

  @Get()
  @Roles('admin', 'dispatcher')
  async getSettings() {
    return this.svc.getAll();
  }

  @Patch()
  @Roles('admin')
  async updateSettings(@Body() body: UpdateSettingsDto) {
    // Upsert any provided keys to app_settings
    for (const [k, v] of Object.entries(body as any)) {
      await this.svc.upsert(k, v);
    }
    return this.svc.getAll();
  }
}
