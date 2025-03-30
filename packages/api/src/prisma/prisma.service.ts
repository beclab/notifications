import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@notifications/database';
import { TemplateList } from './seeds';

const isDebug = process.env.IS_DEBUG || false;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.verbose('onModuleInit');
    await this.$connect();

    await this.updateTemplateList();
  }

  async updateTemplateList() {
    if (isDebug) {
      this.logger.verbose('Delete template');

      await this.templateContent.deleteMany({});
      await this.template.deleteMany({});
    }

    for (const t of TemplateList) {
      await this.template.create({
        data: t,
      });
    }
  }
}
