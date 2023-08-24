import { Controller, Post } from '@nestjs/common';
import { ScraperWeatherService } from './weather.service';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  @Cron('0 */2 * * * *') // Cron expression to run every 2 minutes
  @Post('download')
  async fetchAndSaveData() {
    console.debug('getting data');
    const data = await this.weatherScraperService.fetchData(this.url_2h);
    console.debug('saving data');
    await this.weatherScraperService.saveData(data);
    console.debug('Weather data fetching and saved');
  }
}
