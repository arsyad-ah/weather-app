import React from 'react'
import {
  CLOUDY,
  IMAGE_PATH,
  OVERCAST,
  PARTLY_CLOUDY,
  PLACEHOLDER_IMAGE,
  RAIN,
  SHOWERS,
  SUNNY,
  THUNDER,
  WINDY,
} from '../../shared/constants'

const WeatherImageMapping: Record<string, string> = {
  cloudy: CLOUDY,
  partly_cloudy: PARTLY_CLOUDY,
  sunny: SUNNY,
  sunshine: SUNNY,
  overcast: OVERCAST,
  rain: RAIN,
  shower: SHOWERS,
  thunder: THUNDER,
  windy: WINDY,
  no_image: PLACEHOLDER_IMAGE,
}

const MapWeatherToImage = (cleanedWeatherCondition: string) => {
  let imageFilename: string

  // I am not too sure what are the different weather conditions from the API, but
  // these are what I can see so far.
  if (cleanedWeatherCondition.includes('partly cloudy')) {
    imageFilename = WeatherImageMapping.partly_cloudy
  } else if (cleanedWeatherCondition.includes('cloudy') || cleanedWeatherCondition.includes('cloud')) {
    imageFilename = WeatherImageMapping.cloudy
  } else if (cleanedWeatherCondition.includes('sunny') || cleanedWeatherCondition.includes('sunshine')) {
    imageFilename = WeatherImageMapping.sunny
  } else if (cleanedWeatherCondition.includes('overcast')) {
    imageFilename = WeatherImageMapping.overcast
  } else if (cleanedWeatherCondition.includes('rain')) {
    imageFilename = WeatherImageMapping.rain
  } else if (cleanedWeatherCondition.includes('shower')) {
    imageFilename = WeatherImageMapping.shower
  } else if (cleanedWeatherCondition.includes('thunder')) {
    imageFilename = WeatherImageMapping.thunder
  } else if (cleanedWeatherCondition.includes('windy')) {
    imageFilename = WeatherImageMapping.windy
  } else {
    imageFilename = WeatherImageMapping.no_image
  }
  return imageFilename
}

interface WeatherMappingProps {
  weatherCondition: string
}

const WeatherImage: React.FC<WeatherMappingProps> = ({ weatherCondition }) => {
  const cleanedWeatherCondition = weatherCondition.toLowerCase().replace('(day)', '').replace('(night)', '').trim()

  const imageFilename = MapWeatherToImage(cleanedWeatherCondition)
  const imageUrl = `${IMAGE_PATH}/${imageFilename}`
  return (
    <div>
      <img className='custom-img' src={imageUrl} />
    </div>
  )
}

export default WeatherImage
