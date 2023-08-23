import { Injectable } from '@nestjs/common';
import { DatetimeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatetimeService {
  constructor(private readonly prisma: PrismaService) {}

  async getMinDate() {
    const minDate: DatetimeDto = await this.prisma.traffic.findFirst({
      orderBy: {
        timestamp: 'asc',
      },
      select: {
        timestamp: true,
      },
    });
    return minDate;
  }
}
