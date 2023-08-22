import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScraperResponseDto, ScraperTrafficDto, LocationDto } from 'src/dto';
import { ScraperService } from 'src/scraper/scraper.service';
import * as Minio from 'minio';
import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class ScraperTrafficService extends ScraperService {
  private minioClient: Minio.Client;
  private allLocations: LocationDto[];
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

  async saveData(data: ScraperResponseDto) {
    const traffics: ScraperTrafficDto[] = data.cameras;
    this.allLocations = await this.prisma.locationMetadata.findMany({
      select: {
        name: true,
        latitude: true,
        longitude: true,
      },
    });

    if (traffics.length > 0) {
      for (const traffic of traffics) {
        const trafficData = await this.transformData(traffic);
        const bucketPath = await this.uploadImage(trafficData.image_url);
        const savedData = await this.prisma.traffic.create({
          data: { ...trafficData, image_path: bucketPath },
        });
      }
    }
  }

  async seedImageObject() {
    const allImages = await this.prisma.traffic.findMany();
    for (const image of allImages) {
      this.uploadImage(image.image_url);
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

  private async transformData(traffic: ScraperTrafficDto) {
    const locationName = await this.getLocation(
      traffic.location.latitude,
      traffic.location.longitude,
    );
    const transformedItem = {
      timestamp: traffic.timestamp,
      image_url: traffic.image,
      latitude: traffic.location.latitude,
      longitude: traffic.location.longitude,
      camera_id: traffic.camera_id,
      image_height: traffic.image_metadata.height,
      image_width: traffic.image_metadata.width,
      md5: traffic.image_metadata.md5,
      location_name: locationName,
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

  private async getLocation(latitude: number, longitude: number) {
    let locationName: string;

    const location = await this.prisma.traffic.findFirst({
      select: {
        location_name: true,
      },
      where: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    if (location === null) {
      const nearesetLocation = this.findNearestReference(latitude, longitude);
      locationName = nearesetLocation.name;
    } else {
      locationName = location.location_name;
    }
    return locationName;
  }

  private findNearestReference(pointLatitude: number, pointLongitude: number) {
    let nearestReference = null;
    let minDistance = Infinity;

    for (const location of this.allLocations) {
      const distance = this.calculateDistance(
        pointLatitude,
        pointLongitude,
        location.latitude,
        location.longitude,
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestReference = location;
      }
    }
    return nearestReference;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.degToRad(lat2 - lat1);
    const dLon = this.degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(lat1)) *
        Math.cos(this.degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  private degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
