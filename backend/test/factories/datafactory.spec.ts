import { faker } from '@faker-js/faker';

faker.seed(123);

export class TrafficMockFactory {
  static generateMockData() {
    const mockTraffic = {
      id: faker.number.int(),
      location_name: faker.person.jobArea(),
      image_url: faker.image.url(),
      image_height: faker.number.int(),
      image_width: faker.number.int(),
      camera_id: faker.person.jobArea(),
      latitude: faker.number.float(),
      longitude: faker.number.float(),
      md5: faker.string.uuid(),
      image_path: faker.system.filePath(),
      timestamp: faker.date.past(),
      update_timestamp: faker.date.past(),
    };
    return mockTraffic;
  }
}

export class WeatherMockFactory {
  static generateMockData() {
    const mockWeather = {
      id: faker.number.int(),
      area: faker.person.jobArea(),
      forecast: faker.lorem.word(),
      timestamp: faker.date.past(),
      update_timestamp: faker.date.past(),
    };
    return mockWeather;
  }
}

export class LocationMetadataMockFactory {
  static generateMockData() {
    const mockLocation = {
      id: faker.number.int(),
      name: faker.person.jobArea(),
      latitude: faker.number.float(),
      longitude: faker.number.float(),
      timestamp: faker.date.past(),
      update_timestamp: faker.date.past(),
    };
    return mockLocation;
  }
}
