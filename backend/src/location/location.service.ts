import { Injectable } from '@nestjs/common';
import { LocationDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLocations() {
    const locations = await this.prisma.locationMetadata.findMany();
    const mappedLocations: LocationDto[] = locations.map((location) => ({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    }));

    return mappedLocations;
  }
}
