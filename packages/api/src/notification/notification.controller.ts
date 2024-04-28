import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';

import { Result, returnSucceed, ProviderRequest } from '@bytetrade/core';
import {
  Sender,
  RecipientAddress,
  Recipients,
  NotifyPolicy,
  NotifyRule,
  Template,
  TemplateContent,
  Job,
  Message,
} from '@notifications/database';
import { PrismaService } from '../prisma/prisma.service';
import { SenderService } from './sender.service';
import { RecipientsService } from './recipients.service';
import { RecipientAddressService } from './recipient.address.service';
import { NotifyPolicyService } from './notify.policy.service';
import { NotifyRuleService } from './notify.rule.service';
import { TemplateService } from './template.service';
import { TemplateContentService } from './template.content.service';
import { JobService } from './job.service';
import { NotificationCredential } from '@notifications/database';

@Controller('/notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly senderService: SenderService,
    private readonly recipientsService: RecipientsService,
    private readonly recipientAddressService: RecipientAddressService,
    private readonly notifyPolicyService: NotifyPolicyService,
    private readonly notifyRuleService: NotifyRuleService,
    private readonly templateService: TemplateService,
    private readonly templateContentService: TemplateContentService,
    private readonly jobService: JobService,
  ) {}

  @Get('/sender')
  async allSenders(): Promise<Result<Sender[]>> {
    return returnSucceed(await this.senderService.findAll());
  }

  @Post('/sender')
  async addSender(
    @Body()
    {
      sender,
      credential,
    }: {
      sender: Sender;
      credential: NotificationCredential;
    },
  ): Promise<Result<Sender>> {
    return returnSucceed(await this.senderService.create(sender, credential));
  }

  @Get('/recipients')
  async allRecipients(): Promise<Result<Recipients[]>> {
    return returnSucceed(await this.recipientsService.findAll());
  }

  @Post('/recipients')
  async createRecipients(
    @Body() { recipients }: { recipients: Recipients },
  ): Promise<Result<Recipients>> {
    return returnSucceed(await this.recipientsService.create(recipients));
  }

  @Get('/recipientAddress')
  async allRecipientAddress(): Promise<Result<RecipientAddress[]>> {
    return returnSucceed(await this.recipientAddressService.findAll());
  }

  @Post('/recipientAddress')
  async createRecipientAddress(
    @Body() { id, name, data }: { name: string; id: number; data: any },
  ): Promise<Result<RecipientAddress[]>> {
    console.log(id);
    const recipients: Recipients = await this.recipientsService.findOne(
      Number(id),
    );
    if (!recipients) {
      throw new Error('Not found recipients.');
    }

    console.log(recipients);
    return returnSucceed(
      await this.prisma.recipientAddress.create({
        data: {
          name: name,
          recipientsId: recipients.id,
          type: recipients.type,
          data: data,
        },
      }),
    );
  }

  @Delete('/recipientAddress/:id')
  async deleteRecipientAddress(
    @Param('id') id: number,
  ): Promise<Result<RecipientAddress[]>> {
    return returnSucceed(await this.recipientAddressService.remove(id));
  }

  @Get('/notifyPolicy')
  async allNotifyGroup(): Promise<Result<NotifyPolicy[]>> {
    return returnSucceed(await this.notifyPolicyService.findAll());
  }

  @Post('/notifyPolicy')
  async createNotifyGroup(
    @Body() { policy }: { policy: NotifyPolicy },
  ): Promise<Result<NotifyPolicy>> {
    return returnSucceed(await this.notifyPolicyService.create(policy));
  }

  @Get('/notifyRule/:id')
  async getNotifyByPolicyID(
    @Param('id') id: number,
  ): Promise<Result<NotifyRule[]>> {
    return returnSucceed(
      await this.notifyRuleService.findByPolicyId(Number(id)),
    );
  }

  @Post('/notifyRule')
  async createNotifyRule(
    @Body() { rule }: { rule: NotifyRule },
  ): Promise<Result<NotifyRule>> {
    return returnSucceed(await this.notifyRuleService.create(rule));
  }

  @Delete('/notifyRule/:id')
  async deleteNotifyByPolicyID(
    @Param('id') id: number,
  ): Promise<Result<NotifyRule>> {
    return returnSucceed(await this.notifyRuleService.remove(Number(id)));
  }

  @Get('/template')
  async allTemplate(): Promise<Result<Template[]>> {
    return returnSucceed(await this.templateService.findAll());
  }

  @Post('/template')
  async createTemplate(
    @Body()
    { template, contents }: { template: Template; contents: TemplateContent[] },
  ): Promise<Result<Template>> {
    return returnSucceed(await this.templateService.create(template, contents));
  }

  @Delete('/template/:id')
  async deleteTemplate(@Param('id') id: number): Promise<Result<Template>> {
    return returnSucceed(await this.templateService.remove(id));
  }

  @Get('/templateContent')
  async allTemplateContent(): Promise<Result<TemplateContent[]>> {
    return returnSucceed(await this.templateContentService.findAll());
  }

  @Get('/job')
  async allJob(): Promise<Result<Job[]>> {
    return returnSucceed(await this.jobService.findAll());
  }

  @Post('/create_job')
  async addNewJob(
    @Body()
    body: ProviderRequest<{ job: Job }>,
  ): Promise<Result<Template>> {
    this.logger.debug(body);
    return await this.jobService.processOneJob(body.data.job);
  }

  @Post('/job')
  async createJob(
    @Body()
    { job }: { job: Job },
  ): Promise<Result<Template>> {
    return await this.jobService.processOneJob(job);
  }

  @Get('/job/message/:id')
  async getMessagesByJobId(
    @Param('id') id: number,
  ): Promise<Result<Message[]>> {
    return returnSucceed(
      await this.prisma.message.findMany({ where: { jobId: Number(id) } }),
    );
  }
}
