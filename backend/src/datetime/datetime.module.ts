import { Module } from '@nestjs/common';
import { DatetimeService } from './datetime.service';
import { DatetimeController } from './datetime.controller';

@Module({
  providers: [DatetimeService],
  controllers: [DatetimeController],
})
export class DatetimeModule {}
