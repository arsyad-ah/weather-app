import { Module } from '@nestjs/common';
import { ScraperWeatherService } from './weather.service';
import { ScraperWeatherController } from './weather.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ScraperWeatherService],
  controllers: [ScraperWeatherController],
  imports: [ScheduleModule.forRoot(), PrismaModule],
})
export class ScraperWeatherModule {}
