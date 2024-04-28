import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotifyRule } from '@notifications/database';

@Injectable()
export class NotifyRuleService {
  constructor(private prisma: PrismaService) {}

  async create(data: NotifyRule): Promise<NotifyRule> {
    return this.prisma.notifyRule.create({
      data,
    });
  }

  async findAll(): Promise<NotifyRule[]> {
    return this.prisma.notifyRule.findMany({ where: {} });
  }

  async findOne(id: number): Promise<NotifyRule> {
    return this.prisma.notifyRule.findUnique({ where: { id } });
  }

  async findByPolicyId(notifyPolicyId: number): Promise<NotifyRule[]> {
    return this.prisma.notifyRule.findMany({ where: { notifyPolicyId } });
  }

  async update(id: number, data: NotifyRule): Promise<NotifyRule> {
    return this.prisma.notifyRule.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<NotifyRule> {
    return this.prisma.notifyRule.delete({ where: { id } });
  }
}
