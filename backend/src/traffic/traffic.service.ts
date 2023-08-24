import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatetimeDto, TrafficDto } from 'src/dto';
import * as Minio from 'minio';
import { convertDatetimeToUTC } from 'src/utils/utils';

@Injectable()
export class TrafficService {
  private minioClient: Minio.Client;
  constructor(private readonly prisma: PrismaService) {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_SERVER_NAME,
      port: Number(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async getLTEDatetime(datetime: string) {
    const newDatetime = new Date(datetime);
    const convertedDatetime = convertDatetimeToUTC(newDatetime);
    try {
      // get the first timestamp in desc order that is <= selected timestamp
      const filterDatetime: DatetimeDto = await this.prisma.traffic.findFirst({
        select: { timestamp: true },
        orderBy: { timestamp: 'desc' },
        where: {
          timestamp: { lte: convertedDatetime },
        },
      });
      return filterDatetime;
    } catch (error) {
      console.error(error);
    }
  }

  async getFilteredTraffics(
    location_name: string,
    filterDatetime: DatetimeDto,
  ) {
    try {
      // find all records based on above timestamp and location
      const traffics = await this.prisma.traffic.findMany({
        where: {
          location_name: {
            contains: location_name,
          },
          timestamp: filterDatetime.timestamp,
        },
      });
      return traffics;
    } catch (error) {
      console.error(error);
    }
  }

  async transformTraffics(traffics) {
    const transformedTraffics = [];
    for (const traffic of traffics) {
      const transformedTraffic: TrafficDto = {
        timestamp: traffic.timestamp,
        image_path: traffic.image_path,
        location: traffic.location_name,
        image_url: await this.getImageUrl(traffic.image_path),
      };
      transformedTraffics.push(transformedTraffic);
    }
    return transformedTraffics;
  }

  private async getImageUrl(path: string) {
    try {
      const imageUrl = await this.minioClient.presignedGetObject(
        process.env.APP_BUCKET_NAME,
        path,
      );
      return imageUrl;
    } catch (error) {
      throw new NotFoundException(`Error getting presignedURL: ${error}`);
    }
  }
}
