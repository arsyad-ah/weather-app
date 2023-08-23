import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeatherService } from './weather/weather.service';
import { TrafficModule } from './traffic/traffic.module';
import { LocationModule } from './location/location.module';
import { ScraperWeatherModule } from './scraper-weather/weather.module';
import { ScraperTrafficModule } from './scraper-traffic/traffic.module';
import { DatetimeModule } from './datetime/datetime.module';

@Module({
  imports: [
    WeatherModule,
    PrismaModule,
    TrafficModule,
    LocationModule,
    ScraperWeatherModule,
    ScraperTrafficModule,
    DatetimeModule,
  ],
  controllers: [AppController],
  providers: [AppService, WeatherService],
})
export class AppModule {}
