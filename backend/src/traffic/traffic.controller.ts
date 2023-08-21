import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { TrafficService } from './traffic.service';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly weatherService: TrafficService) {}

  @Get('fetch')
  async fetchData(
    @Query('location_name') area: string,
    @Query('datetime') datetime: string,
  ) {
    const data = await this.weatherService.getData(area, datetime);
    return data;
  }
}
