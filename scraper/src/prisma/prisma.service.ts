import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const URL = 'postgresql://postgres:password@localhost:5432/nest?schema=public';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: URL,
        },
      },
    });
  }
}
