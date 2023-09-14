import { Module } from '@nestjs/common';
import { ScraperTrafficController } from './traffic.controller';
import { ScraperTrafficService } from './traffic.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [ScraperTrafficController],
  providers: [ScraperTrafficService],
  imports: [ScheduleModule.forRoot()],
})
export class ScraperTrafficModule {}
