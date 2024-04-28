import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from '@notifications/database';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Message): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany({ where: {} });
  }

  async findOne(id: number): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async update(id: number, data: Message): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Message> {
    return this.prisma.message.delete({ where: { id } });
  }
}
