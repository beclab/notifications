import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { UsersService } from './UsersService';
import { TemplateContentService } from './template.content.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SystemController } from './system.controller';

@Module({
	imports: [PrismaModule, ScheduleModule.forRoot()],
	controllers: [NotificationController, SystemController],
	providers: [TemplateService, TemplateContentService, UsersService]
})
export class NotificationModule {}
