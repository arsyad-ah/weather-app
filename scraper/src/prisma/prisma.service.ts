import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

console.log('aaa');
console.log(process.env);

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
