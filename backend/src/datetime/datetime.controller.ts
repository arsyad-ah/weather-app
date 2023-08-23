import { Controller, Get } from '@nestjs/common';
import { DatetimeService } from './datetime.service';

@Controller('datetime')
export class DatetimeController {
  constructor(private readonly datetimeService: DatetimeService) {}

  @Get('fetch/min')
  async fetchMinDatetime() {
    console.log('getting mininum datetime');
    const datetime = await this.datetimeService.getMinDate();
    return datetime;
  }
}
