import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperWeatherModule } from './scraper/weather/weather.module';
import { ScraperTrafficModule } from './scraper/traffic/traffic.module';

@Module({
  imports: [ScraperWeatherModule, ScraperTrafficModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
