import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseDto } from 'src/dto';

@Injectable()
export class ScraperService {
  async fetchData(url: string) {
    try {
      const response = await axios.get(url);
      if (response.data.items && response.data.items.length > 0) {
        const data: ResponseDto = response.data.items[0];
        return data;
      }
    } catch (error) {
      throw new Error(`Failed to fetch data from the API.\n${error}`);
    }
  }
}
