import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from 'src/weather/weather.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { WeatherMockFactory } from 'test/factories/datafactory.spec';
jest.mock('src/prisma/prisma.service');

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    weather: {
      findFirst: jest.fn(),
    },
  };
  const mockWeather = WeatherMockFactory.generateMockData();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    weatherService = module.get<WeatherService>(WeatherService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getData', () => {
    it('should return transformed weather data', async () => {
      const mockArea = mockWeather.area;
      const mockDatetime = '2023-08-24T08:00:00Z';

      mockPrismaService.weather.findFirst.mockResolvedValue(mockWeather);

      const result = await weatherService.getData(mockArea, mockDatetime);

      expect(result).toBeDefined();
      expect(result.location).toBe(mockArea);
      expect(result.forecast).toBe(mockWeather.forecast);
      expect(result.timestamp).toBe(mockWeather.timestamp);
    });

    it('should throw NotFoundException if error occurs', async () => {
      mockPrismaService.weather.findFirst.mockRejectedValue(
        new Error('Mock Error'),
      );

      await expect(
        weatherService.getData('Invalid Area', '2023-08-24T08:00:00Z'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
