import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipientAddress } from '@notifications/database';

@Injectable()
export class RecipientAddressService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RecipientAddress[]> {
    return this.prisma.recipientAddress.findMany({ where: {} });
  }

  async findOne(id: number): Promise<RecipientAddress> {
    return this.prisma.recipientAddress.findUnique({ where: { id } });
  }

  async findByRecipientId(recipientsId: number): Promise<RecipientAddress[]> {
    return this.prisma.recipientAddress.findMany({ where: { recipientsId } });
  }

  async update(id: number, data: RecipientAddress): Promise<RecipientAddress> {
    return this.prisma.recipientAddress.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<RecipientAddress> {
    return this.prisma.recipientAddress.delete({ where: { id } });
  }
}
