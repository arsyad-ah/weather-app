import { Controller, Post } from '@nestjs/common';
import { ScraperTrafficService } from './traffic.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('scraper/traffic')
export class ScraperTrafficController {
  private url: string;

  constructor(private readonly scraperService: ScraperTrafficService) {
    this.url = 'https://api.data.gov.sg/v1/transport/traffic-images';
  }

  @Cron('0 */2 * * * *') // Cron expression to run every 2 minutes
  @Post('download')
  async fetchAndSaveData() {
    console.debug('getting data');
    const data = await this.scraperService.fetchData(this.url);
    console.debug('saving data');
    await this.scraperService.saveData(data);
    console.debug('Traffic data fetching and saved');
  }

  @Post('seed')
  async seedImage() {
    console.debug('seedImage');
    await this.scraperService.seedImageObject();
  }
}
