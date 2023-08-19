import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto, WeatherDto } from 'src/dto';
import { ScraperService } from 'src/scraper/scraper.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeatherService extends ScraperService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  private readonly logger = new Logger(WeatherService.name);

  async saveData(data: ResponseDto) {
    const forecasts: WeatherDto[] = data.forecasts;
    console.log(forecasts[0]);
    if (forecasts.length > 0) {
      for (const forecast of forecasts) {
        const savedData = await this.prisma.weather.create({
          data: {
            area: forecast.area, // Map area to location
            forecast: forecast.forecast,
            timestamp: data.timestamp,
          },
        });
      }
    }
  }
}
