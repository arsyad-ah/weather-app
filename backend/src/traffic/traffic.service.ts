import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrafficDto } from 'src/dto';
import * as Minio from 'minio';

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
    console.log(location_name, datetime);
    const newDatetime = new Date(datetime);
    try {
      const data = await this.prisma.traffic.findFirst({
        where: {
          location_name: {
            contains: location_name,
          },
          timestamp: {
            lte: newDatetime,
          },
        },
      });
      const transformedData: TrafficDto = await this.transformTraffic(data);
      console.log(transformedData);
      return transformedData;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }

  private transformTraffic(data) {
    return this.getImageUrl(data.image_path)
      .then((imageUrl) => ({
        timestamp: data.timestamp,
        image_path: data.image_path,
        location: data.location_name,
        image_url: imageUrl,
      }))
      .catch((error) => {
        console.error(`Error transforming traffic data: ${error}`);
        throw error;
      });
  }

  private async getImageUrl(path: string) {
    try {
      const imageUrl = await this.minioClient.presignedGetObject(
        process.env.APP_BUCKET_NAME,
        path,
      );
      return imageUrl;
    } catch (error) {
      throw new Error(`Error getting presignedURL: ${error}`);
    }
  }
}
