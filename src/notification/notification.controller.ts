import {
	Controller,
	Get,
	Post,
	Body,
	Delete,
	Param,
	Logger,
	Req
} from '@nestjs/common';

import { Result, returnError, returnSucceed } from '@bytetrade/core';
import { Template, TemplateContent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { TemplateService } from './template.service';
import { TemplateContentService } from './template.content.service';

@Controller('/notification')
export class NotificationController {
	private readonly logger = new Logger(NotificationController.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly templateService: TemplateService,
		private readonly templateContentService: TemplateContentService
	) {}

	@Get('/template')
	async allTemplate(): Promise<Result<Template[]>> {
		return returnSucceed(await this.templateService.findAll());
	}

	@Post('/findTemplateByName')
	async GetTemplateByAppNameAndName(
		@Req() request: Request,
		@Body() data: { appId: string; templateId: string }
	): Promise<Result<Template>> {
		const { appId, templateId } = data;
		this.logger.log(
			`Fetching template by app id: ${appId} and template id: ${templateId}`
		);

		const template =
			await this.templateService.findTemplateByApplicationIDandApplicationTemplateId(
				appId,
				templateId
			);
		if (!template) {
			this.logger.warn(
				`Fetching template by app id: ${appId} and template id: ${templateId}`
			);
			return returnError(100, 'Template not found');
		}

		return returnSucceed(template);
	}

	@Get('/templateContent/:id')
	async getTemplateContentById(
		@Param('id') id: number
	): Promise<Result<Template[]>> {
		console.log('getTemplateContentById', id);
		try {
			return returnSucceed(
				await this.templateContentService.findByTemplateId(id)
			);
		} catch (error) {
			console.error('Error fetching template content:', error);
			return returnError(100, 'TemplateContent get failed');
		}
	}

	@Post('/template')
	async createTemplate(
		@Body()
		{
			template,
			contents
		}: {
			template: Template;
			contents: TemplateContent[];
		}
	): Promise<Result<Template>> {
		return returnSucceed(
			await this.templateService.create(template, contents)
		);
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
