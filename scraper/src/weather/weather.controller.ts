import { Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';

const URL =
  'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=2023-08-18T01:00:00';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherScraperService: WeatherService) {}

  @Get('download')
  async fetchAndSaveData() {
    const data = await this.weatherScraperService.fetchData(URL);
    await this.weatherScraperService.saveData(data);
    return { message: 'Data fetching and saved' };
  }
}
