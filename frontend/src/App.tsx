import React, { useState } from 'react'
import DateAndTimeSelector from './components/datetime/datetime'
import TrafficDisplay from './components/traffic/traffic'
import { Dayjs } from 'dayjs'
import ContainedButtons from './shared/button'
import { fetchTrafficUrl, fetchWeather } from './api/datafetcher'
import LocationSelector from './components/location/location'
import WeatherInfoProps from './components/weather/weather'
import { TrafficDto, WeatherDto } from './dto'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Unstable_Grid2'
import './style.css'

function App() {
  const [datetime, setDatetime] = useState<Dayjs | null>(null)
  const [location, setLocation] = useState<string>('')
  const [traffics, setTraffics] = useState<TrafficDto[]>([])
  const [weather, setWeather] = useState<WeatherDto | null | undefined>()

  const handleDatetimeChange = (newDatetime: Dayjs | null) => {
    const convertedDatetime = newDatetime || null
    setDatetime(convertedDatetime)
  }

  const chooseLocation = (data: string) => {
    setLocation(data)
  }

  const handleSearchClick = async (location: string, datetime: Dayjs | null) => {
    if (location && datetime) {
      const traffics = await fetchTrafficUrl(location, datetime)
      const weather = await fetchWeather(location, datetime)
      setTraffics(traffics)
      setWeather(weather)
    } else {
      alert('Please check if datetime and location is selected.')
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Traffic and Weather App</h2>
      </header>

      <Container maxWidth='xl' className='top-component-grid'>
        <div className='component'>
          <DateAndTimeSelector datetime={datetime} onDatetimeChange={handleDatetimeChange}></DateAndTimeSelector>
        </div>
        <div className='component'>
          <LocationSelector onChange={chooseLocation}></LocationSelector>
        </div>
      </Container>
      <div className='button'>
        <ContainedButtons onClick={() => handleSearchClick(location, datetime)}></ContainedButtons>
      </div>

      <div className='bottom-component-grid'>
        <Container maxWidth='md' className='component'>
          <WeatherInfoProps weather={weather}></WeatherInfoProps>
        </Container>

        <Container maxWidth='md' className='component'>
          <TrafficDisplay traffics={traffics}></TrafficDisplay>
        </Container>
      </div>
    </div>
  )
}

export default App
