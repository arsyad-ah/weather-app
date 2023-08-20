import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrafficDto } from 'src/dto';

@Injectable()
export class TrafficService {
  constructor(private readonly prisma: PrismaService) {}

  async getData(location_id: number) {
    const data = await this.prisma.traffic.findFirst({
      where: {
        location_id: location_id,
      },
    });
    const transformedData: TrafficDto = this.transformTraffic(data);
    return { data: transformedData };
  }

  private transformTraffic(data) {
    return {
      timestamp: data.timestamp,
      image_path: data.image_path,
      location: data.location_id,
    };
  }
}
