import axios from 'axios'
import { WeatherDto, Location, TrafficDto, DatetimeDto } from '../dto'
import { Dayjs } from 'dayjs'

//TODO: change url when dockerize
const URL = 'http://localhost:3344'

function processLocationNDatetime(location: string, datetime: Dayjs) {
  const locationName = `location_name=${encodeURIComponent(location)}`
  const encDatetime = `datetime=${encodeURIComponent(datetime?.add(8, 'hour').toISOString())}`
  return [locationName, encDatetime]
}

const fetchData = async (url: string) => {
  const response = await axios
    .get(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
  return response
}

export const fetchTrafficUrl = async (location: string, datetime: Dayjs) => {
  const [locationName, encDatetime] = processLocationNDatetime(location, datetime)
  const url = `${URL}/traffic/fetch?${locationName}&${encDatetime}`
  const response = await fetchData(url)
  const data: TrafficDto[] = response?.data
  return data
}

export const fetchAllLocations = async () => {
  const url = `${URL}/location/fetch_all`
  const response = await fetchData(url)
  const data: Location[] = response?.data
  return data
}

export const fetchWeather = async (location: string, datetime: Dayjs) => {
  const [locationName, encDatetime] = processLocationNDatetime(location, datetime)
  const url = `${URL}/weather/fetch?${locationName}&${encDatetime}`
  const response = await fetchData(url)
  const data: WeatherDto = response?.data
  return data ?? null
}

export const fetchMinDatetime = async () => {
  const url = `${URL}/datetime/fetch/min`
  const response = await fetchData(url)
  const data: DatetimeDto = response?.data
  return data
}
