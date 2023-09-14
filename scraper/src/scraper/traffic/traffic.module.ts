import { Module } from '@nestjs/common';
import { ScraperTrafficController } from './traffic.controller';
import { ScraperTrafficService } from './traffic.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ScraperTrafficController],
  providers: [ScraperTrafficService],
  imports: [ScheduleModule.forRoot(), PrismaModule],
})
export class ScraperTrafficModule {}
