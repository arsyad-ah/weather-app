import { Module } from '@nestjs/common';
import { ScraperTrafficController } from './traffic.controller';
import { ScraperTrafficService } from './traffic.service';

@Module({
  controllers: [ScraperTrafficController],
  providers: [ScraperTrafficService],
})
export class ScraperTrafficModule {}
