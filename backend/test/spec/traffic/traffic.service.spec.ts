// TODO
import { Test, TestingModule } from '@nestjs/testing';
import { TrafficService } from 'src/traffic/traffic.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Minio from 'minio';
import { TrafficMockFactory } from 'test/factories/datafactory.spec';
import { TrafficDto } from 'src/dto';
jest.mock('src/prisma/prisma.service');
jest.mock('minio');

describe('TrafficService', () => {
  let trafficService: TrafficService;
  let prismaService: PrismaService;
  let minioClient: Minio.Client;

  const count = 3;

  const mockTraffics = [];
  for (let i = 0; i < count; i++) {
    mockTraffics.push(TrafficMockFactory.generateMockData());
  }

  const mockPrismaService = {
    traffic: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockMinioClient = {
    presignedGetObject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: Minio.Client,
          useValue: mockMinioClient,
        },
      ],
    }).compile();

    trafficService = module.get<TrafficService>(TrafficService);
    prismaService = module.get<PrismaService>(PrismaService);
    minioClient = module.get<Minio.Client>(Minio.Client);
  });

  beforeEach(() => {
    jest
      .spyOn(trafficService as any, 'getImageUrl')
      .mockResolvedValue(mockTraffics[0].image_url);
  });

  describe('getLTEDatetime', () => {
    it('should return a DatetimeDto', async () => {
      const datetime = '2023-08-24T08:00:00Z';

      const mockDatetime = { timestamp: new Date(datetime) };
      mockPrismaService.traffic.findFirst.mockResolvedValue(mockDatetime);

      const result = await trafficService.getLTEDatetime(datetime);
      expect(result).toHaveProperty('timestamp', mockDatetime.timestamp);
      expect(result).toEqual(mockDatetime);
    });
  });

  describe('getFilteredTraffics', () => {
    it('should return an array of traffics', async () => {
      const locationName = mockTraffics[0].location_name;
      const filterDatetime = { timestamp: new Date() };

      mockPrismaService.traffic.findMany.mockResolvedValue(mockTraffics);

      const result = await trafficService.getFilteredTraffics(
        locationName,
        filterDatetime,
      );

      expect(result).toEqual(mockTraffics);
    });
  });

  describe('transformTraffics', () => {
    it('should return an array of transformed traffics', async () => {
      const result = await trafficService.transformTraffics(mockTraffics);

      // Check that the transformed result matches expectations
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getImageUrl', () => {
    it('should return the presigned URL', async () => {
      const mockPath = 'image-path';

      const mockPresignedUrl = mockTraffics[0].image_url;
      mockMinioClient.presignedGetObject.mockResolvedValue(mockPresignedUrl);

      const result = await (trafficService as any).getImageUrl(mockPath);
      expect(result).toEqual(mockPresignedUrl);
    });
  });
});
