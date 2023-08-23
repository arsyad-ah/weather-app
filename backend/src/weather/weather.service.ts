import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WeatherDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeatherService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(WeatherService.name);

  async getData(area: string, datetime: string) {
    try {
      const newDatetime = new Date(datetime);
      const data = await this.prisma.weather.findFirst({
        where: {
          area: {
            contains: area,
          },
          timestamp: {
            lte: newDatetime,
          },
        },
      });
      const transformedData: WeatherDto = this.transformWeather(data);
      return transformedData;
    } catch (error) {
      const errorMsg = 'Error fetching weather data';
      console.error(`${errorMsg}: ${error}`);
      throw new NotFoundException(`${errorMsg}: ${error}`);
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
