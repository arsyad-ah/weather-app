import { Injectable, NotFoundException } from '@nestjs/common';
import { LocationDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLocations() {
    const locationNames = await this.prisma.traffic.findMany({
      distinct: ['location_name'],
      select: {
        location_name: true,
      },
    });
    const loc = locationNames.map((loc) => loc.location_name);
    const locations = await this.prisma.locationMetadata.findMany({
      select: { name: true, latitude: true, longitude: true },
      where: { name: { in: loc } },
      orderBy: { name: 'asc' },
    });

    const mappedLocations: LocationDto[] = locations.map((location) => ({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    }));

    return mappedLocations;
  }

  private async getAllUniqueTrafficLocations() {
    try {
      const locationNames = await this.prisma.traffic.findMany({
        distinct: ['location_name'],
        select: {
          location_name: true,
        },
      });
      return locationNames;
    } catch (error) {
      const errorMsg = 'Error fetching unique traffic location';
      console.error(`${errorMsg}: ${error}`);
      throw new NotFoundException(`${errorMsg}: ${error}`);
    }
  }
}
