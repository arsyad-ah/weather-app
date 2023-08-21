import { Controller, Get, Post } from '@nestjs/common';
import { ScraperTrafficService } from './traffic.service';

@Controller('scraper/traffic')
export class ScraperTrafficController {
  private url: string;

  constructor(private readonly scraperService: ScraperTrafficService) {
    this.url = 'https://api.data.gov.sg/v1/transport/traffic-images';
  }

  @Get('download')
  async fetchAndSaveData() {
    console.log('getting data');
    const data = await this.scraperService.fetchData(this.url);
    console.log('saving data');
    await this.scraperService.saveData(data);
    return { message: 'Data fetching started' };
  }
}
