import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from 'src/location/location.service';
import { PrismaService } from 'src/prisma/prisma.service';
jest.mock('src/prisma/prisma.service');

describe('LocationService', () => {
  let locationService: LocationService;
  const location1 = 'Location1';
  const location2 = 'Location2';
  const location3 = 'Location3';

  const mockLocationNames = [
    { location_name: location1 },
    { location_name: location2 },
    { location_name: location3 },
    { location_name: location1 },
    { location_name: location2 },
  ];
  const distinctLocationNames = [
    ...new Set(mockLocationNames.map((loc) => loc.location_name)),
  ];
  const mockLocations = [
    { name: location1, latitude: 123, longitude: 456 },
    { name: location2, latitude: 789, longitude: 101 },
    { name: location3, latitude: 789, longitude: 101 },
    { name: location1, latitude: 111, longitude: 222 },
    { name: location2, latitude: 333, longitude: 444 },
    { name: location3, latitude: 555, longitude: 666 },
  ];

  const mockPrismaService = {
    traffic: {
      findMany: jest.fn().mockResolvedValue(distinctLocationNames),
    },
    locationMetadata: {
      findMany: jest.fn().mockResolvedValue(mockLocations),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    locationService = module.get<LocationService>(LocationService);
  });

  describe('getUniqueTrafficLocations', () => {
    it('should return an array of unique traffic location names', async () => {
      const result = await locationService.getUniqueTrafficLocations();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(distinctLocationNames.length);
    });
  });

  describe('getLocations', () => {
    it('should return an array of mapped location data', async () => {
      const result = await locationService.getLocations(distinctLocationNames);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(mockLocations.length);

      result.forEach((location, index) => {
        expect(location.name).toBe(mockLocations[index].name);
        expect(location.latitude).toBe(mockLocations[index].latitude);
        expect(location.longitude).toBe(mockLocations[index].longitude);
      });
    });
  });
});
