import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';

import { Result, returnSucceed } from '@bytetrade/core';
import { Template, TemplateContent } from '@notifications/database';
import { PrismaService } from '../prisma/prisma.service';

import { TemplateService } from './template.service';
import { TemplateContentService } from './template.content.service';

@Controller('/notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly templateService: TemplateService,
    private readonly templateContentService: TemplateContentService,
  ) {}

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
}
