import React from 'react'
import { Paragraph, StyledImg } from '../../shared/style'
import { WeatherDto } from '../../dto'
import { DatetimeFormatter } from '../../shared/utils'
import WeatherImage from './weather-mapping'
import { EMPTY_FORECAST, IMAGE_PATH, PLACEHOLDER_IMAGE } from '../../shared/constants'

interface WeatherInfoProps {
  weather: WeatherDto | null | undefined
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  let content: JSX.Element

  const [date, time] = DatetimeFormatter(weather?.timestamp || null)
  const forecast = weather?.forecast || EMPTY_FORECAST

  if (weather === undefined) {
    content = (
      <div>
        <Paragraph>Please select location and date & time</Paragraph>
      </div>
    )
  } else {
    if (weather === null) {
      content = (
        <div>
          <Paragraph>{`Weather forecast is unavailable. Please check if datetime or location is correct.`}</Paragraph>
          <StyledImg src={`${IMAGE_PATH}/${PLACEHOLDER_IMAGE}`}></StyledImg>
        </div>
      )
    } else {
      content = (
        <div>
          <h4>{`Forecast: ${forecast}`}</h4>
          <Paragraph>{`Location: ${weather?.location}`}</Paragraph>
          <WeatherImage weatherCondition={forecast}></WeatherImage>
          <Paragraph>{`Correct as of: ${date} ${time}`}</Paragraph>
        </div>
      )
    }
  }
  return (
    <div>
      <h2 className='title'>Weather Information</h2>
      {content}
    </div>
  )
}

export default WeatherInfo
