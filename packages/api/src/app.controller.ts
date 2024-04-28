import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}
}
