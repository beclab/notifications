import { Controller, Get, Post, Body, Logger } from '@nestjs/common';

import {
  Result,
  returnError,
  returnSucceed,
  ProviderRequest,
} from '@bytetrade/core';
import { RecipientType } from '@notifications/database';
import { PrismaService } from '../prisma/prisma.service';

@Controller('/termipass')
export class TermiPassController {
  private readonly logger = new Logger(TermiPassController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Post('/create_token')
  async addFireBaseToken(
    @Body() request: ProviderRequest<{ name: string; token: string }>,
  ): Promise<Result<null>> {
    this.logger.verbose(request);
    const data = request.data;
    const recipients = await this.prisma.recipients.findFirst({
      where: { name: 'TermiPass', type: RecipientType.Firebase },
    });

    if (!recipients) {
      return returnError(101, 'Recipients not exists');
    }

    const tokens = await this.prisma.recipientAddress.findMany({
      where: { recipientsId: recipients.id },
    });

    const findResult = tokens.find((t) => t.data['token'] == data.token);

    if (!findResult) {
      await this.prisma.recipientAddress.create({
        data: {
          name: data.name,
          recipientsId: recipients.id,
          type: RecipientType.Firebase,
          data: {
            token: data.token,
          },
        },
      });
      return returnSucceed(null);
    } else {
      return returnError(101, 'Token already exists');
    }
  }

  @Get('/token')
  async listFireBaseToken(): Promise<Result<null>> {
    const recipients = await this.prisma.recipients.findFirst({
      where: { name: 'Default', type: RecipientType.Firebase },
    });

    const tokens = await this.prisma.recipientAddress.findMany({
      where: { recipientsId: recipients.id },
    });

    return returnSucceed(tokens);
  }
}
