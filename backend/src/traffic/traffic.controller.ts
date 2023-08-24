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
    const filterDatetime = await this.trafficService.getLTEDatetime(datetime);
    const filteredTraffics = await this.trafficService.getFilteredTraffics(
      area,
      filterDatetime,
    );
    const data = await this.trafficService.transformTraffics(filteredTraffics);
    return data;
  }
}
