import { Controller, Get, Post } from '@nestjs/common';
import { ScraperWeatherService } from './weather.service';

@Controller('scraper/weather')
export class ScraperWeatherController {
  private url: string;
  private url_2h: string;
  private url_24h: string;
  private url_4d: string;

  constructor(private readonly weatherScraperService: ScraperWeatherService) {
    this.url = 'https://api.data.gov.sg/v1/environment';
    this.url_2h = `${this.url}/2-hour-weather-forecast`;
    this.url_24h = `${this.url}/24-hour-weather-forecast`;
    this.url_4d = `${this.url}/4-day-weather-forecast`;
  }

  @Get('download')
  async fetchAndSaveData() {
    const data = await this.weatherScraperService.fetchData(this.url_2h);
    await this.weatherScraperService.saveData(data);
    return { message: 'Data fetching and saved' };
  }
}
