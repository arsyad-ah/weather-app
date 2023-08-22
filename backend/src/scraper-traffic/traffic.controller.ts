import { Controller, Get, Post } from '@nestjs/common';
import { ScraperTrafficService } from './traffic.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('scraper/traffic')
export class ScraperTrafficController {
  private url: string;

  constructor(private readonly scraperService: ScraperTrafficService) {
    this.url = 'https://api.data.gov.sg/v1/transport/traffic-images';
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  @Get('download')
  async fetchAndSaveData() {
    console.debug('getting data');
    const data = await this.scraperService.fetchData(this.url);
    console.debug('saving data');
    await this.scraperService.saveData(data);
    console.log('Traffic data fetching and saved');
  }
}
