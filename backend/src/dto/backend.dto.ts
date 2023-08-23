export class DatetimeDto {
  timestamp: Date;
}

export class WeatherDto {
  location: string;
  forecast: string;
  timestamp: DatetimeDto['timestamp'];
}

export class TrafficDto {
  timestamp: DatetimeDto['timestamp'];
  image_path: string;
  location: number;
  image_url: string;
}

export class LocationDto {
  name: string;
  latitude: number;
  longitude: number;
}
