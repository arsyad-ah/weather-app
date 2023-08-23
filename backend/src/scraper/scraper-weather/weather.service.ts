import { Injectable, Logger } from '@nestjs/common';
import { ScraperResponseDto, ScraperWeatherDto } from 'src/dto';
import { ScraperService } from 'src/scraper/scraper.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNow } from 'src/utils/utils';

@Injectable()
export class ScraperWeatherService extends ScraperService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  private readonly logger = new Logger(ScraperWeatherService.name);

  async saveData(data: ScraperResponseDto) {
    const forecasts: ScraperWeatherDto[] = data.forecasts;
    const timestamp = getNow();
    if (forecasts.length > 0) {
      for (const forecast of forecasts) {
        const savedData = await this.prisma.weather.create({
          data: {
            area: forecast.area, // Map area to location
            forecast: forecast.forecast,
            timestamp: timestamp,
          },
        });
      }
    }
  }
}
