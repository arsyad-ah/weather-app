import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('fetch')
  async fetchData(
    @Query('location_name') area: string,
    @Query('datetime') datetime: string,
  ) {
    const data = await this.weatherService.getData(area, datetime);
    return data;
  }
}
