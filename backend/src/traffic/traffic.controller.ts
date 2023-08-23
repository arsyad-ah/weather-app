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
    console.debug('traffic getting data');
    const data = await this.trafficService.getData(area, datetime);
    return data;
  }
}
