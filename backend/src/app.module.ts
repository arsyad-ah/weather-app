import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeatherService } from './weather/weather.service';
import { TrafficModule } from './traffic/traffic.module';

@Module({
  imports: [WeatherModule, PrismaModule, TrafficModule],
  controllers: [AppController],
  providers: [AppService, WeatherService],
})
export class AppModule {}
