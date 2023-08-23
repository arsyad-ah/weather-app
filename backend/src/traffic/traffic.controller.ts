import { Controller, Get, Query } from '@nestjs/common';
import { TrafficService } from './traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get('fetch')
  async fetchData(
    @Query('location_name') area: string,
    @Query('datetime') datetime: string,
  ) {
    console.log('traffic getting data');
    console.log(`area: ${area}`);
    console.log(`datetime: ${datetime}`);
    const data = await this.trafficService.getData(area, datetime);
    return data;
  }
}
