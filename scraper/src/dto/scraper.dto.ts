export class WeatherDto {
  area: string;
  forecast: string;
  timestamp?: string;
  update_timestamp?: string;
}

export class ResponseDto {
  timestamp: string;
  valid_period?: any;
  forecasts?: any;
  cameras?: any;
}

interface ImageLocation {
  latitude: number;
  longitude: number;
}

interface ImageMetadata {
  height: number;
  width: number;
  md5: string;
}

export class TrafficDto {
  timestamp: string;
  location: ImageLocation;
  image: string;
  image_metadata: ImageMetadata;
  camera_id: string;
  image_path: string;
  updated_timestamp: string;
}
