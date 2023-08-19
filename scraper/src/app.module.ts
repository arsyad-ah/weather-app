import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrafficService } from './traffic/traffic.service';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [ScraperModule, PrismaModule, TrafficModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService, TrafficService],
})
export class AppModule {}
