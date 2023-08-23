import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrafficDto } from 'src/dto';
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

  async getData(location_name: string, datetime: string) {
    const newDatetime = new Date(datetime);
    const convertedDatetime = convertDatetimeToUTC(newDatetime);
    try {
      // get the first timestamp in desc order that is <= selected timestamp
      const filterDatetime = await this.prisma.traffic.findFirst({
        select: { timestamp: true },
        orderBy: { timestamp: 'desc' },
        where: {
          timestamp: { lte: convertedDatetime },
        },
      });
      // find all records based on above timestamp and location
      const traffics = await this.prisma.traffic.findMany({
        where: {
          location_name: {
            contains: location_name,
          },
          timestamp: filterDatetime.timestamp,
        },
      });
      const transformedData: TrafficDto[] =
        await this.transformTraffics(traffics);
      return transformedData;
    } catch (error) {
      const errorMsg = 'Error fetching traffic data';
      console.error(`${errorMsg}: ${error}`);
      throw new NotFoundException(`${errorMsg}: ${error}`);
    }
  }

  private async transformTraffics(traffics) {
    const transformedTraffics = [];
    for (const traffic of traffics) {
      const transformedTraffic = {
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
      const errorMsg = 'Error getting presignedURL';
      console.error(`${errorMsg}: ${error}`);
      throw new NotFoundException(`${errorMsg}: ${error}`);
    }
  }
}
