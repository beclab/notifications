import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sender, SenderType } from '@notifications/database';
import { LOCAL_CREDENTIAL } from './global';
import { NotificationCredential } from '@notifications/database';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  constructor(private prisma: PrismaService) {}

  async create(
    sender: Sender,
    credential: NotificationCredential,
  ): Promise<Sender> {
    this.logger.verbose(sender);
    this.logger.verbose(credential);
    if (sender.type === SenderType.Application) {
      const app = await this.prisma.sender.findFirst({
        where: { app: sender.app },
      });
      if (app) {
        throw Error('Application already has sender');
      }
    }

    const res = await this.prisma.sender.create({
      data: sender,
    });

    if (LOCAL_CREDENTIAL) {
      await this.prisma.credential.create({
        data: {
          senderId: res.id,
          type: sender.type,
          data: credential,
        },
      });
    } else {
      //
    }

    return res;
  }

  async findAll(): Promise<Sender[]> {
    return this.prisma.sender.findMany({ where: {} });
  }

  async findOne(id: number): Promise<Sender> {
    return this.prisma.sender.findUnique({ where: { id } });
  }

  async update(id: number, data: Sender): Promise<Sender> {
    return this.prisma.sender.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<Sender> {
    return this.prisma.sender.delete({ where: { id } });
  }
}
