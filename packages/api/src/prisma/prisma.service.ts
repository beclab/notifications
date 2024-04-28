import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient, ActiveStatus, Prisma } from '@notifications/database';
import {
  SenderList,
  RecipientsList,
  NotifyPolicyList,
  TemplateList,
} from './seeds';

const isDebug = process.env.IS_DEBUG || false;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.verbose('onModuleInit');
    await this.$connect();
    await this.updateSender();
    await this.updateRecipients();
    await this.updateNotify();
    await this.updateTemplateList();
  }

  async updateSender() {
    if (isDebug) {
      this.logger.verbose('Delete sender');
      await this.credential.deleteMany({});
      await this.sender.deleteMany({});
    }
    for (const ob of SenderList) {
      const app = await this.sender.findFirst({
        where: { app: ob.sender.app },
      });
      if (app) {
        this.logger.verbose('Skip Create Sender ' + app.name);
        continue;
      }

      const res = await this.sender.create({
        data: ob.sender,
      });

      await this.credential.create({
        data: {
          senderId: res.id,
          type: ob.sender.type,
          data: ob.credential as Prisma.JsonValue,
        },
      });
    }
  }

  async updateRecipients() {
    if (isDebug) {
      this.logger.verbose('Delete recipients');
      await this.recipientAddress.deleteMany({});
      await this.recipients.deleteMany({});
    }

    for (const recipients of RecipientsList) {
      const res = await this.recipients.findFirst({
        where: {
          name: recipients.name,
        },
      });
      console.log(res);
      if (res) {
        if (isDebug) {
          //
        } else {
          this.logger.verbose('Skip Create Recipients ' + recipients.name);
          continue;
        }
      }
      this.logger.verbose('Create Recipients ' + recipients.name);
      await this.recipients.create({ data: recipients });
    }
  }

  async updateNotify() {
    if (isDebug) {
      this.logger.verbose('Delete NotifyPolicy');
      await this.message.deleteMany({});
      await this.job.deleteMany({});
      await this.notifyRule.deleteMany({});
      await this.notifyPolicy.deleteMany({});
    }

    for (const group of NotifyPolicyList) {
      const res = await this.notifyPolicy.findFirst({
        where: {
          name: group.name,
        },
      });
      console.log(res);
      if (res) {
        if (isDebug) {
          // this.logger.verbose('Delete NotifyPolicy ' + group.name);
          // await this.notifyPolicy.delete({ where: { id: res.id } });
          // await this.notifyRule.deleteMany({
          //   where: { notifyPolicyId: res.id },
          // });
        } else {
          continue;
        }
      }

      this.logger.verbose('Create notifyPolicy ' + group.name);
      await this.notifyPolicy.create({ data: group });
    }

    const senders = await this.sender.findMany({});
    const recipients = await this.recipients.findMany({});
    const notifyPolicy = await this.notifyPolicy.findMany({
      orderBy: { id: 'asc' },
    });
    const notifyRule = await this.notifyRule.findMany({});
    if (
      senders.length != 2 ||
      recipients.length != 2 ||
      notifyPolicy.length != 3
    ) {
      this.logger.fatal(recipients);
      this.logger.fatal(notifyPolicy);
      this.logger.fatal(
        'updateNotify size error ' +
          senders.length +
          ' ' +
          recipients.length +
          ' ' +
          notifyPolicy.length,
      );
      return;
    }

    if (notifyRule.length != 0) {
      // if (isDebug) {
      //   this.logger.verbose('Notify already exists ' + notifyRule.length);
      //   return;
      // } else {
      //   // this.logger.verbose('Delete All NotifyRules ');
      //   // await this.notifyRule.deleteMany({});
      //   //
      // }
      return;
    }

    await this.notifyRule.create({
      data: {
        notifyPolicyId: notifyPolicy[0].id,
        sender: senders[0].id,
        recipients: recipients[0].id,
        status: ActiveStatus.Active,
      },
    });
    await this.notifyRule.create({
      data: {
        notifyPolicyId: notifyPolicy[0].id,
        sender: senders[1].id,
        recipients: recipients[1].id,
        status: ActiveStatus.Active,
      },
    });
    await this.notifyRule.create({
      data: {
        notifyPolicyId: notifyPolicy[1].id,
        sender: senders[0].id,
        recipients: recipients[0].id,
        status: ActiveStatus.Active,
      },
    });
    await this.notifyRule.create({
      data: {
        notifyPolicyId: notifyPolicy[2].id,
        sender: senders[1].id,
        recipients: recipients[1].id,
        status: ActiveStatus.Active,
      },
    });
  }

  async updateTemplateList() {
    if (isDebug) {
      this.logger.verbose('Delete template');

      await this.templateContent.deleteMany({});
      await this.template.deleteMany({});
    }
    const template = await this.template.findMany({});

    if (template.length != 0) {
      if (isDebug) {
        // this.logger.verbose(
        //   'Delete exists templates, size: ' + template.length,
        // );
        // await this.template.deleteMany({});
        // await this.templateContent.deleteMany({});
        //
      } else {
        this.logger.verbose('Template already exists ' + template.length);
        return;
      }
    }
    for (const t of TemplateList) {
      // let name: string = '';
      // if (t.appId == 'system') {
      //   const policy = await this.notifyPolicy.findFirst({
      //     where: { name: 'TermiPassAndDesktop' },
      //   });
      //   if (policy) {
      //     name = policy.name;
      //   }
      // } else if (
      //   t.appId == 'vault' ||
      //   t.appId == 'settings' ||
      //   t.appId == 'profile'
      // ) {
      //   const policy = await this.notifyPolicy.findFirst({
      //     where: { name: 'TermiPass' },
      //   });
      //   if (policy) {
      //     name = policy.name;
      //   }
      // } else {
      //   //
      // }
      // t.notifyGroup = name;
      await this.template.create({
        data: t,
      });
    }
  }
}
