import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Recipients } from '@notifications/database';

@Injectable()
export class RecipientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Recipients): Promise<Recipients> {
    return this.prisma.recipients.create({
      data,
    });
  }

  async findAll(): Promise<Recipients[]> {
    return this.prisma.recipients.findMany({ where: {} });
  }

  async findOne(id: number): Promise<Recipients> {
    return this.prisma.recipients.findUnique({ where: { id } });
  }

  async update(id: number, data: Recipients): Promise<Recipients> {
    return this.prisma.recipients.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Recipients> {
    return this.prisma.recipients.delete({ where: { id } });
  }
}
