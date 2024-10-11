import axios from 'axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SenderService } from './sender.service';
import { RecipientsService } from './recipients.service';
import { RecipientAddressService } from './recipient.address.service';
import { NotifyPolicyService } from './notify.policy.service';
import { NotifyRuleService } from './notify.rule.service';
import { TemplateService } from './template.service';
import { TemplateContentService } from './template.content.service';
import { Interval } from '@nestjs/schedule';
import {
  Job,
  JobStatus,
  MessageStatus,
  RecipientAddress,
  Sender,
  Message,
  RecipientType,
} from '@notifications/database';
import {
  validateRecipient,
  getSenderInstance,
  TerminusNotificationSender,
  getNotificationRecipient,
} from '../sender';
import { LOCAL_CREDENTIAL } from './global';
import {
  NotificationCredential,
  NotificationRecipientData,
} from '@notifications/database';
import {
  Recipients,
  NotifyPolicy,
  NotifyRule,
  Template,
} from '@notifications/database';
import {
  Result,
  returnSucceed,
  NotificationResultCode,
  NotificationResult,
  MessageBody,
  MessageData,
  MessageTopic,
  returnError,
  TerminusInfo,
} from '@bytetrade/core';

@Injectable()
export class JobService implements OnModuleInit {
  private readonly logger = new Logger(JobService.name);
  private isInSent = false;

  private pendingMessages = [];

  public terminusInfo: TerminusInfo | null = null;

  public language: string = 'en-US';

  constructor(
    private prisma: PrismaService,
    private readonly senderService: SenderService,
    private readonly recipientsService: RecipientsService,
    private readonly recipientAddressService: RecipientAddressService,
    private readonly notifyPolicyService: NotifyPolicyService,
    private readonly notifyRuleService: NotifyRuleService,
    private readonly templateService: TemplateService,
    private readonly templateContentService: TemplateContentService,
  ) {}

  public async updateTerminusInfo(): Promise<TerminusInfo> {
    const response: any = await axios.get(
      'http://bfl/bfl/backend/v1/terminus-info',
    );
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    if (response.data.code != 0) {
      throw new Error(response.data);
    }
    this.terminusInfo = response.data.data;
    this.logger.log('terminusInfo');
    this.logger.log(this.terminusInfo);
    return response.data.data;
  }

  public async updateLanguage() {
    this.logger.debug('updateLanguage');
    try {
      const response: any = await axios.get(
        'http://bfl/bfl/backend/v1/config-system',
      );
      this.logger.log('config_system');
      this.logger.log(response.data);

      if (response.data.code !== 0) {
        throw new Error(response.data.message);
      }

      this.language = response.data.data.language || 'en-US';
      console.log(this.language);
    } catch (e) {
      console.log(e);
    }
  }

  async onModuleInit() {
    const m = await this.prisma.message.findMany({
      where: { status: 'Pending' },
    });
    this.logger.verbose('JobService pending job in database: ' + m.length);
    for (const message of m) {
      this.pendingMessages.push(message);
    }

    this.logger.verbose(
      'JobService pendingJobs length: ' + this.pendingMessages.length,
    );

    await this.updateTerminusInfo();
    await this.updateLanguage();
  }

  async findAll(): Promise<Job[]> {
    return this.prisma.job.findMany({ where: {} });
  }

  async findOne(id: number): Promise<Job> {
    return this.prisma.job.findUnique({ where: { id } });
  }

  async update(id: number, data: Job): Promise<Job> {
    return this.prisma.job.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Job> {
    return this.prisma.job.delete({ where: { id } });
  }

  async processOneJob(job: Partial<Job>): Promise<Result<Template | null>> {
    try {
      const template: Template = await this.templateService.findOne(
        job.templateId,
      );
      if (!template) {
        //throw Error('Template not found.');
        return returnError(1, 'Template not found');
      }

      const messageData: MessageBody = await this.getMessageBody(job, template);
      this.logger.debug('MessageBody');
      this.logger.debug(messageData);

      let notifyPolicy: NotifyPolicy = null;

      if (job.notifyPolicyId == -1) {
        if (template.notifyGroup == '') {
          notifyPolicy = await this.notifyPolicyService.findDefault();
        } else {
          notifyPolicy = await this.notifyPolicyService.findByName(
            template.notifyGroup,
          );
        }
      } else {
        notifyPolicy = await this.notifyPolicyService.findOne(
          job.notifyPolicyId,
        );
      }
      if (!notifyPolicy) {
        throw Error('NotifyPolicy not found.');
      }

      const notifyRules: NotifyRule[] =
        await this.notifyRuleService.findByPolicyId(job.notifyPolicyId);

      const messages = [];
      for (const rule of notifyRules) {
        this.logger.debug('rule');
        this.logger.debug(rule);
        const sender: Sender = await this.senderService.findOne(rule.sender);
        if (!sender) {
          throw Error('sender not found.');
        }
        const recipients: Recipients = await this.recipientsService.findOne(
          rule.recipients,
        );
        if (!recipients) {
          throw Error('recipients not found.');
        }

        if (recipients.type == RecipientType.NoNeed) {
          const message = {
            senderType: sender.type,
            message: JSON.stringify(messageData),
            sender: JSON.stringify(sender),
            recipientType: recipients.type,
            recipient: JSON.stringify({ type: 'NoNeed', data: {} }),
            user: this.terminusInfo.terminusName,
            status: MessageStatus.Pending,
            statusInfo: '',
          };
          messages.push(message);
        } else {
          const addresses: RecipientAddress[] =
            await this.recipientAddressService.findByRecipientId(
              rule.recipients,
            );

          this.logger.debug('addresses');
          this.logger.debug(addresses);

          for (const address of addresses) {
            const message = {
              senderType: sender.type,
              message: JSON.stringify(messageData),
              sender: JSON.stringify(sender),
              recipientType: recipients.type,
              recipient: JSON.stringify(address),
              user: this.terminusInfo.terminusName,
              status: MessageStatus.Pending,
              statusInfo: '',
            };
            messages.push(message);
          }
        }
      }

      const imessage = {
        data: {
          templateId: job.templateId,
          notifyPolicyId: job.notifyPolicyId,
          language: job.language,
          messageNum: messages.length,
          messages: {
            create: messages,
          },
          rawMessage: job.rawMessage,
          user: this.terminusInfo.terminusName,
          status: messages.length == 0 ? JobStatus.Finished : JobStatus.Pending,
        },
      };
      this.logger.log(imessage);

      const res = await this.prisma.job.create(imessage);
      this.logger.log(res);
      const ms = await this.prisma.message.findMany({
        where: { jobId: res.id, status: MessageStatus.Pending },
      });
      this.logger.log('message lenth: ' + ms.length);
      for (const mm of ms) {
        this.pendingMessages.push(mm);
      }
      return returnSucceed(res);
    } catch (e) {
      this.logger.log('error');
      this.logger.log(e.message);
      return returnError(1, e.message || 'insert job failed');
    }
  }

  async getMessageBody(
    job: Partial<Job>,
    template: Template,
  ): Promise<MessageBody> {
    const raw_message: MessageData = JSON.parse(JSON.stringify(job.rawMessage));

    const message: MessageBody = {
      topic: MessageTopic.Data,
      event: template.appTemplateName, //raw_message.event,
      message: raw_message,
      terminusName: this.terminusInfo.terminusName,
    };

    if (template.topic == MessageTopic.Data) {
    } else if (template.topic == MessageTopic.CANCEL_SIGN) {
      message.topic = MessageTopic.CANCEL_SIGN;
    } else if (
      template.topic == MessageTopic.Notification ||
      template.topic == MessageTopic.SIGN
    ) {
      let templateContent = await this.templateContentService.findByLanguage(
        template.id,
        job.language,
      );
      if (templateContent.length == 0) {
        templateContent = await this.templateContentService.findByLanguage(
          template.id,
          template.defaultLanguage,
        );
      }
      if (templateContent.length != 1) {
        throw Error('Template Content not matched.');
      }

      if (template.topic == MessageTopic.SIGN) {
        message.topic = MessageTopic.SIGN;
        message.app = {
          id: template.appId,
          title: template.appName,
          icon: 'https://file.bttcdn.com/termipass/icon.png',
        };
      } else {
        message.topic = MessageTopic.Notification;
      }

      if (
        (await this.templateService.checkTemplateMatchedVariablesWithRecord(
          templateContent[0].title + ' ' + templateContent[0].body,
          raw_message.vars,
        )) == false
      ) {
        throw Error('Check Template Matched Variables Failed.');
      }

      message.notification = {
        title: this.templateService.replaceTemplateWithVariables(
          templateContent[0].title,
          raw_message.vars,
        ),
        body: this.templateService.replaceTemplateWithVariables(
          templateContent[0].body,
          raw_message.vars,
        ),
      };
    }
    return message;
  }

  async updateMessage(m: Message) {
    await this.prisma.message.update({
      where: { id: m.id },
      data: m,
    });
    const job = await this.findOne(m.jobId);
    if (m.status == MessageStatus.Succeed) {
      job.successNum++;
    }
    job.sentNum++;
    if (job.sentNum == job.messageNum) {
      job.status = JobStatus.Finished;
    } else {
      job.status = JobStatus.Running;
    }
    await this.update(job.id, job);
  }

  //@Cron('*/2 * * * * *')
  @Interval(100)
  async handlePendingMessage() {
    if (this.isInSent || this.pendingMessages.length == 0) {
      return;
    }
    this.isInSent = true;

    const m = this.pendingMessages.shift();
    this.logger.debug('handle message');
    this.logger.debug(m);

    try {
      const recipient: RecipientAddress = JSON.parse(m.recipient);
      this.logger.verbose('Recipient');
      this.logger.verbose(recipient);
      if (!validateRecipient(recipient.type, recipient.data)) {
        m.status = MessageStatus.Failed;
        m.statusInfo = 'Invalid recipient';
        await this.updateMessage(m);
        this.isInSent = false;
        return;
      }

      const sender: Sender = JSON.parse(m.sender);
      this.logger.verbose('Sender');
      this.logger.verbose(sender);

      let credential: any;
      if (LOCAL_CREDENTIAL) {
        credential = await this.prisma.credential.findFirst({
          where: { id: sender.id },
        });
      } else {
        // TODO: get credential from remote
      }
      this.logger.verbose('credential');
      this.logger.verbose(credential);

      if (!credential) {
        m.status = MessageStatus.Failed;
        m.statusInfo = 'Invalid credential';
        await this.updateMessage(m);
        this.isInSent = false;
        return;
      }

      const s: TerminusNotificationSender = getSenderInstance(
        m.senderType,
        credential.data as NotificationCredential,
      );

      if (!s) {
        m.status = MessageStatus.Failed;
        m.statusInfo = 'Invalid sender';
        await this.updateMessage(m);
        this.isInSent = false;
        return;
      }

      const notificationRecipient = getNotificationRecipient(
        m.recipientType,
        recipient.data as NotificationRecipientData,
      );
      if (!notificationRecipient) {
        m.status = MessageStatus.Failed;
        m.statusInfo = 'Invalid recipient';
        await this.updateMessage(m);
        this.isInSent = false;
        return;
      }
      this.logger.verbose('notificationRecipient');
      this.logger.verbose(notificationRecipient);

      m.status = MessageStatus.Senting;
      await this.prisma.message.update({
        where: { id: m.id },
        data: m,
      });

      const result: NotificationResult = await s.execute(
        m.id,
        notificationRecipient,
        JSON.parse(m.message),
      );

      if (result.code === NotificationResultCode.Success) {
        m.status = MessageStatus.Succeed;
      } else {
        m.status = MessageStatus.Failed;
      }
      if (result.message) {
        m.statusInfo = result.message;
      }

      await this.updateMessage(m);
    } catch (e) {
      this.logger.error(e);
      m.status = MessageStatus.Failed;
      m.statusInfo = e.message || 'Unknown error';
      await this.updateMessage(m);
    } finally {
      this.isInSent = false;
    }
  }
}
