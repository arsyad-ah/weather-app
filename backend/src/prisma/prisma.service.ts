import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const POSTGRES_USER = process.env.POSTGRES_USER;
    const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
    const POSTGRES_DB = process.env.POSTGRES_DB;
    const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
    const POSTGRES_ENDPOINT = process.env.POSTGRES_NAME;
    super({
      datasources: {
        db: {
          url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_ENDPOINT}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`,
        },
      },
    });
  }
}
