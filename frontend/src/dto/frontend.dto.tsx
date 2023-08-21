export interface TrafficDto {
  timestamp: string;
  image_path: string;
  image_url: string;
  location: number;
}

export interface Location {
  id: number;
  location: string;
  longitude: number;
  latitude: number
}

export interface WeatherDto {
  forecast: string;
  location: number;
}