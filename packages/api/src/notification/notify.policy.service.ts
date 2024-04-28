import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotifyPolicy } from '@notifications/database';

@Injectable()
export class NotifyPolicyService {
  constructor(private prisma: PrismaService) {}

  async create(data: NotifyPolicy): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.create({
      data,
    });
  }

  async findAll(): Promise<NotifyPolicy[]> {
    return this.prisma.notifyPolicy.findMany({ where: {} });
  }

  async findOne(id: number): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.findUnique({ where: { id } });
  }

  async findDefault(): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.findFirst({ where: { isDefault: true } });
  }

  async findByName(name: string): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.findFirst({ where: { name } });
  }

  async update(id: number, data: NotifyPolicy): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<NotifyPolicy> {
    return this.prisma.notifyPolicy.delete({ where: { id } });
  }
}
