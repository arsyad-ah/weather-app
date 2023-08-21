import { Timestamp } from 'rxjs';

export class ScraperWeatherDto {
  area: string;
  forecast: string;
  timestamp?: string;
  update_timestamp?: string;
}

export class ScraperResponseDto {
  timestamp: string;
  valid_period?: any;
  forecasts?: any;
  cameras?: any;
}

interface ScraperImageLocation {
  latitude: number;
  longitude: number;
}

interface ScraperImageMetadata {
  height: number;
  width: number;
  md5: string;
}

export class ScraperTrafficDto {
  timestamp: Date;
  location: ScraperImageLocation;
  image: string;
  image_metadata: ScraperImageMetadata;
  camera_id: string;
  image_path: string;
  updated_timestamp: string;
}
