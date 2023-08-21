import { Module } from '@nestjs/common';
import { ScraperWeatherService } from './weather.service';
import { ScraperWeatherController } from './weather.controller';

@Module({
  providers: [ScraperWeatherService],
  controllers: [ScraperWeatherController],
})
export class ScraperWeatherModule {}
