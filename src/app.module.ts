import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';

@Module({
	imports: [PrismaModule, NotificationModule],
	controllers: [],
	providers: []
})
export class AppModule {}
