import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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

		this.logger.log('Update template', TemplateList.length);

		for (const t of TemplateList) {
			const r = await this.template.findFirst({
				where: {
					appId: t.appId,
					appTemplateId: t.appTemplateId
				}
			});
			if (r) {
				this.logger.log(
					`Template already exists: ${t.appId} - ${t.appTemplateId}`
				);
				continue;
			}
			this.logger.log(
				`Creating template: ${t.appId} - ${t.appTemplateId}`
			);
			// Create
			await this.template.create({
				data: t
			});
		}
	}
}
