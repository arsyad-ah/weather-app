import axios from "axios";
import { WeatherDto, Location } from '../dto'

export const fetchData = async (url: string) => {
  const response = await axios.get(url, {
    headers: {"Content-Type": "application/json",},
  })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return response
}

export const fetchImageUrl = async (location: string) => {
  //TODO: change url when dockerize
  const url = `http://localhost:3344/traffic/fetch?location_id=${location}`;
  const response = await fetchData(url)
  const data: WeatherDto = response?.data.data;
  const imageUrl = data.image_url
  return imageUrl
}

export const fetchAllLocations = async () => {
  // TODO: change url when dockerize
  const url = 'http://localhost:3344/location/fetch_all'
  const response = await fetchData(url)
  const data = response?.data
  return data as Location[]
}
