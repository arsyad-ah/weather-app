import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('fetch_all')
  async fetchAllLocations() {
    const locations = await this.locationService.getAllLocations();
    return locations;
  }
}
