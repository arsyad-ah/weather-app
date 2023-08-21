import axios from "axios";
import { WeatherDto, Location, TrafficDto } from '../dto'
import { Dayjs } from "dayjs";

//TODO: change url when dockerize
const URL = 'http://localhost:3344'

function processLocationNDatetime(location: string, datetime: Dayjs | null) {
  const locationName = `location_name=${location}`
  const encDatetime = `datetime=${datetime?.add(8, 'hour').toISOString()}`
  return [locationName, encDatetime]
}

export const fetchData = async (url: string) => {
  const response = await axios.get(url, {
    headers: {"Content-Type": "application/json",},
  })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  return response
}

export const fetchImageUrl = async (location: string, datetime: Dayjs | null) => {
  const [locationName, encDatetime] = processLocationNDatetime(location, datetime)

  const url = `${URL}/traffic/fetch?${locationName}&${encDatetime}`;
  const response = await fetchData(url)
  const data: TrafficDto = response?.data.data;
  const imageUrl = data?.image_url
  return imageUrl
}

export const fetchAllLocations = async () => {
  const url = `${URL}/location/fetch_all`
  const response = await fetchData(url)
  const data = response?.data
  return data as Location[]
}

export const fetchWeather = async (location: string, datetime: Dayjs | null) => {
  const [locationName, encDatetime] = processLocationNDatetime(location, datetime)
  const url = `${URL}/weather/fetch?${locationName}&${encDatetime}`;
  const response = await fetchData(url)
  const data: WeatherDto = response?.data.data;
  return data?.forecast
}

