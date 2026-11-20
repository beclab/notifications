import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { UsersService } from './UsersService';
import { TemplateContentService } from './template.content.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [PrismaModule, ScheduleModule.forRoot()],
	controllers: [NotificationController],
	providers: [TemplateService, TemplateContentService, UsersService]
})
export class NotificationModule {}
