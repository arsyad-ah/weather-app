import { Controller, Get, Post } from '@nestjs/common';
import { TrafficService } from './traffic.service';

const URL = 'https://api.data.gov.sg/v1/transport/traffic-images';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly scraperService: TrafficService) {}

  @Get('download')
  async fetchAndSaveData() {
    console.log('getting data');
    const data = await this.scraperService.fetchData(URL);
    console.log('saving data');
    await this.scraperService.saveData(data);
    return { message: 'Data fetching started', data: data };
  }
}
