export class WeatherDto {
  location: string;
  forecast: string;
  timestamp: string;
}

export class TrafficDto {
  timestamp: string;
  image_path: string;
  location: number;
  image_url: string;
}

export class LocationDto {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
}
