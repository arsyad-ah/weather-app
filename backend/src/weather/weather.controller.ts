import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('fetch')
  async fetchData(@Query('area') area: string) {
    const data = await this.weatherService.getData(area);
    return data;
  }
}
