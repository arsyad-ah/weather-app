import { Test, TestingModule } from '@nestjs/testing';
import { DatetimeService } from 'src/datetime/datetime.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrafficMockFactory } from '../../factories/datafactory.spec';
jest.mock('src/prisma/prisma.service');

describe('DatetimeService', () => {
  let service: DatetimeService;

  const mockData = TrafficMockFactory.generateMockData();
  const expected = { timestamp: mockData.timestamp };
  const mockPrismaService = {
    traffic: {
      findFirst: jest.fn().mockReturnValue(expected),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatetimeService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<DatetimeService>(DatetimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMinDate', () => {
    it('should return minimum datetime', async () => {
      const result = await service.getMinDate();
      expect(result).toBe(expected);
    });
  });
});
