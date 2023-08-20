import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto, TrafficDto } from 'src/dto';
import { ScraperService } from 'src/scraper/scraper.service';
import * as Minio from 'minio';
import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class TrafficService extends ScraperService {
  private minioClient: Minio.Client;

  constructor(private readonly prisma: PrismaService) {
    super();
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_SERVER_NAME,
      port: Number(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async saveData(data: ResponseDto) {
    const traffics: TrafficDto[] = data.cameras;
    if (traffics.length > 0) {
      for (const traffic of traffics) {
        const trafficData = this.transformData(traffic);
        const bucketPath = await this.uploadImage(trafficData.image_url);
        const savedData = await this.prisma.traffic.create({
          data: { ...trafficData, image_path: bucketPath },
        });
      }
    }
  }

  private async uploadImage(imageUrl: string) {
    const bucket_name = process.env.APP_BUCKET_NAME;
    const image_folder = process.env.APP_IMAGE_FOLDER;
    const [year, month, filename] = imageUrl.split('/').slice(-3);

    // download file
    const tempFilePath = await this.downloadAndProcessFile(imageUrl, filename);
    const fileStream = fs.createReadStream(tempFilePath);
    const imagePath = `${image_folder}/${year}/${month}/${filename}`;
    const size = 2048;

    try {
      //upload and delete
      await this.minioClient.putObject(
        bucket_name,
        imagePath,
        fileStream,
        size,
      );
      await fs.unlink(tempFilePath);
      return imagePath;
    } catch (error) {
      throw new Error(
        `Failed to upload image: ${filename} to bucket: ${bucket_name}.\n${error}`,
      );
    }
  }

  private transformData(traffic: TrafficDto) {
    const transformedItem = {
      timestamp: traffic.timestamp,
      image_url: traffic.image,
      latitude: traffic.location.latitude,
      longitude: traffic.location.longitude,
      camera_id: traffic.camera_id,
      image_height: traffic.image_metadata.height,
      image_width: traffic.image_metadata.width,
      md5: traffic.image_metadata.md5,
      location_id: 123, // TODO: replace with reverse geo-location
    };
    return transformedItem;
  }

  private async downloadAndProcessFile(url: string, filename: string) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      // Specify temporary directory
      const tempDir = path.join(__dirname, '..', 'tmp');
      const tempFilePath = path.join(tempDir, filename);

      // Save the downloaded data to a temporary file
      await fs.ensureDir(tempDir);
      await fs.writeFile(tempFilePath, response.data);
      return tempFilePath;
    } catch (error) {
      console.error(`Error downloading: ${error}`);
    }
  }
}
