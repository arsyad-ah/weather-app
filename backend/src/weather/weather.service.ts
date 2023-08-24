import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WeatherDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { convertDatetimeToUTC } from 'src/utils/utils';

@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(WeatherService.name);

  async getData(area: string, datetime: string) {
    try {
      const newDatetime = new Date(datetime);
      const convertedDatetime = convertDatetimeToUTC(newDatetime);
      const data = await this.prisma.weather.findFirst({
        orderBy: { timestamp: 'desc' },
        where: {
          area: {
            contains: area,
          },
          timestamp: {
            lte: convertedDatetime,
          },
        },
      });
      const transformedData: WeatherDto = this.transformWeather(data);
      return transformedData;
    } catch (error) {
      throw new NotFoundException(`Error fetching weather data: ${error}`);
    }
  }

  private transformWeather(data) {
    return {
      location: data.area,
      forecast: data.forecast,
      timestamp: data.timestamp,
    };
  }
}
