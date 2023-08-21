export interface WeatherDto {
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