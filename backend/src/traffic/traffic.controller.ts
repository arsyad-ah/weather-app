import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { Timestamp } from 'rxjs';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly weatherService: TrafficService) {}

  @Get('fetch')
  async fetchData(
    @Query('location_id', ParseIntPipe) area: number,
    @Query('datetime') datetime: Date,
  ) {
    const data = await this.weatherService.getData(area, datetime);
    return data;
  }
}
