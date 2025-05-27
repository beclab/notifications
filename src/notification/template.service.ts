import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Template, TemplateContent } from '@prisma/client';

@Injectable()
export class TemplateService {
	private readonly logger = new Logger(TemplateService.name);
	constructor(private prisma: PrismaService) {}

	async create(
		template: Template,
		contents: TemplateContent[]
	): Promise<Template> {
		for (const content of contents) {
			if (
				!this.checkTemplateMatchedVariables(
					content.title + ' ' + content.body,
					template.variables as string[]
				)
			) {
				throw Error(
					'Template content does not match template variables. ' +
						content.title +
						' ' +
						content.body
				);
			}
		}

		const res =
			await this.findTemplateByApplicationIDandApplicationTemplateId(
				template.appId,
				template.appTemplateId
			);
		if (res) {
			this.logger.warn(
				'template exists ',
				template.appId,
				template.appTemplateId
			);
			return res;
		}

		return this.prisma.template.create({
			data: {
				topic: template.topic,
				name: template.name,
				appId: template.appId,
				appName: template.appName,
				appTemplateId: template.appTemplateId,
				defaultLanguage: template.defaultLanguage,
				user: template.user,
				level: template.level,
				status: template.status,
				variables: template.variables,
				content: {
					create: contents
				}
			}
		});
	}

	async findAll() {
		return this.prisma.template.findMany({ where: {} });
	}

	async findOne(id: number): Promise<Template> {
		return this.prisma.template.findUnique({ where: { id } });
	}

	async remove(id: number): Promise<Template> {
		return this.prisma.template.delete({ where: { id } });
	}

	// async findTemplate(name: string): Promise<Template> {
	//   return this.prisma.template.findFirst({
	//     where: { appTemplateName: name },
	//   });
	// }

	async isTemplateExits(
		appId: string,
		appTemplateId: string
	): Promise<boolean> {
		const res = await this.prisma.template.findFirst({
			where: { appId, appTemplateId }
		});
		if (!res) {
			return false;
		}
		return true;
	}

	async findTemplateByApplicationIDandApplicationTemplateId(
		appId: string,
		appTemplateId: string
	): Promise<Template> {
		return await this.prisma.template.findFirst({
			where: { appId, appTemplateId }
		});
	}

	async findTemplate(appName: string, name: string): Promise<Template> {
		return this.prisma.template.findFirst({
			where: { appName: appName, appTemplateId: name }
		});
	}

	async findSystemTemplate(name: string): Promise<Template> {
		return this.prisma.template.findFirst({
			where: { appName: 'System', name }
		});
	}

	extractVariablesFromTemplate(template: string) {
		const variables = [];
		const regex = /{{([^}]+)}}/g;
		const matches = template.match(regex);
		if (matches) {
			matches.forEach((variable) => {
				variables.push(variable.replace(/{{|}}/g, ''));
			});
		}
		return Array.from(new Set(variables));
	}

	checkTemplateMatchedVariablesWithRecord(
		template: string,
		variables: Record<string, string>
	) {
		const v = [];
		for (const key in variables) {
			console.log(key);
			v.push(key);
		}
		return this.checkTemplateMatchedVariables(template, v);
	}
	checkTemplateMatchedVariables(
		template: string,
		variables: string[]
	): boolean {
		const variablesInTemplate = this.extractVariablesFromTemplate(template);
		if (variablesInTemplate.length !== variables.length) {
			return false;
		}
		for (const theVariable of variables) {
			if (!variablesInTemplate.includes(theVariable)) {
				return false;
			}
		}
		return true;
	}

	replaceTemplateWithVariables(
		template: string,
		variables: Record<string, string>
	) {
		let result = template;
		for (const key in variables) {
			result = result.replace(
				new RegExp(`{{${key}}}`, 'g'),
				variables[key]
			);
		}

		return result;
	}
}
