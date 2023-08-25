import React from 'react'
import { Paragraph } from '../../styles/style'
import { WeatherDto } from '../../dto'
import { DatetimeFormatter } from '../../shared/utils'
import WeatherImage from './weather-mapping'
import { EMPTY_FORECAST, IMAGE_PATH, PLACEHOLDER_IMAGE } from '../../shared/constants'
import { InformationFooter, NullInfo, StartingText } from '../../shared/card-content'

interface WeatherInfoProps {
  weather: WeatherDto | null | undefined
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  let content: JSX.Element

  const [date, time] = DatetimeFormatter(weather?.timestamp || null)
  const forecast = weather?.forecast || EMPTY_FORECAST
  const location = weather?.location

  if (weather === undefined) {
    content = <StartingText />
  } else {
    if (weather === null) {
      content = <NullInfo imagePath={IMAGE_PATH} placeholderImage={PLACEHOLDER_IMAGE} infoType={'Weather forecast'}></NullInfo>
    } else {
      content = (
        <div>
          <Paragraph>{`Location: ${location}`}</Paragraph>
          <InformationFooter date={date} time={time}></InformationFooter>
          <WeatherImage weatherCondition={forecast}></WeatherImage>
          <h4>{`Forecast: ${forecast}`}</h4>
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
