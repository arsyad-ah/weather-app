export class DatetimeDto {
  timestamp: Date;
}

export class WeatherDto {
  location: string;
  forecast: string;
  timestamp: Date;
}

export class TrafficDto {
  timestamp: Date;
  image_path: string;
  location: string;
  image_url: string;
}

export class TrafficsDto {}

export class LocationDto {
  name: string;
  latitude: number;
  longitude: number;
}
