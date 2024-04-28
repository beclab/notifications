import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { RecipientsService } from './recipients.service';
import { RecipientAddressService } from './recipient.address.service';
import { NotifyPolicyService } from './notify.policy.service';
import { NotifyRuleService } from './notify.rule.service';
import { TemplateService } from './template.service';
import { TemplateContentService } from './template.content.service';
import { JobService } from './job.service';
import { MessageService } from './message.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TermiPassController } from './termipass.controller';
import { SystemController } from './system.controller';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [NotificationController, TermiPassController, SystemController],
  providers: [
    SenderService,
    RecipientsService,
    RecipientAddressService,
    NotifyPolicyService,
    NotifyRuleService,
    TemplateService,
    TemplateContentService,
    JobService,
    MessageService,
  ],
})
export class NotificationModule {}
