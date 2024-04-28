import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateContent } from '@notifications/database';

@Injectable()
export class TemplateContentService {
  constructor(private prisma: PrismaService) {}

  async create(data: TemplateContent): Promise<TemplateContent> {
    return this.prisma.templateContent.create({
      data,
    });
  }

  async findAll(): Promise<TemplateContent[]> {
    return this.prisma.templateContent.findMany({ where: {} });
  }

  async findOne(id: number): Promise<TemplateContent> {
    return this.prisma.templateContent.findUnique({ where: { id } });
  }

  async findByLanguage(
    templateId: number,
    language: string,
  ): Promise<TemplateContent[]> {
    return this.prisma.templateContent.findMany({
      where: { templateId, language },
    });
  }

  async update(id: number, data: TemplateContent): Promise<TemplateContent> {
    return this.prisma.templateContent.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<TemplateContent> {
    return this.prisma.templateContent.delete({ where: { id } });
  }
}
