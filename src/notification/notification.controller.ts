import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Logger,
  Req,
} from '@nestjs/common';

import { Result, returnError, returnSucceed } from '@bytetrade/core';
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

  @Post('/templateByAppNameAndName')
  async GetTemplateByAppNameAndName(
    @Req() request: Request,
    @Body() data: { name: string; token: string },
  ): Promise<Result<Template>> {
    const { name, token } = data;
    this.logger.log(
      `Fetching template by app name: ${name} and token: ${token}`,
    );

    const template = await this.templateService.findByAppNameAndName(
      name,
      token,
    );
    if (!template) {
      this.logger.warn(
        `Template not found for app name: ${name} and token: ${token}`,
      );
      return returnError(100, 'Template not found');
    }

    return returnSucceed(template);
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
