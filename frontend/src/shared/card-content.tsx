import React from 'react'
import { Paragraph } from '../styles/style'
// import { TrafficDto, WeatherDto } from '../dto'
// import WeatherImage from '../components/weather/weather-mapping'
// import { EMPTY_FORECAST } from './constants'
// import { DatetimeFormatter } from './utils'
// import MyCarousel from './carousel'

interface InformationFooterProps {
  date: string
  time: string
}

export const InformationFooter: React.FC<InformationFooterProps> = ({ date, time }) => {
  return (
    <div>
      <Paragraph>{`As of: ${date} ${time}`}</Paragraph>
    </div>
  )
}

interface NullInfoProps {
  imagePath: string
  placeholderImage: string
  infoType: string
}

export const NullInfo: React.FC<NullInfoProps> = ({ imagePath, placeholderImage, infoType }) => {
  return (
    <div>
      <Paragraph>{`${infoType} is unavailable. Please check if datetime or location is correct.`}</Paragraph>
      <img className='custom-img' src={`${imagePath}/${placeholderImage}`}></img>
    </div>
  )
}

export const StartingText = () => {
  return (
    <div>
      <Paragraph>Please select location and date & time</Paragraph>
    </div>
  )
}

// NOTE: I was thinking of refactoring the 2 bottom information as 1 card,
// but their Dto are different. Might have to relook at the implementation.

// interface InfoProps {
//   infoObject: WeatherDto | TrafficDto[]
//   isTraffic: boolean
// }

// export const CardInformation: React.FC<InfoProps> = ({ infoObject, isTraffic }) => {
//   if (isTraffic) {
//     const traffics = infoObject as TrafficDto[]
//     const location = traffics[0]?.location
//     const [date, time] = DatetimeFormatter(traffics[0]?.timestamp || null)
//   } else {
//     const weather = infoObject as WeatherDto
//     const [date, time] = DatetimeFormatter(weather?.timestamp || null)
//     const forecast = weather?.forecast || EMPTY_FORECAST
//     const location = weather?.location
//   }

//   return (
//     <div>
//       <Paragraph>{`Location: ${location}`}</Paragraph>
//       {isTraffic ? (
//         <MyCarousel images={infoObject as TrafficDto[]}></MyCarousel>
//       ) : (
//         <WeatherImage weatherCondition={forecast}></WeatherImage>
//       )}
//       <h4>{`Forecast: ${forecast}`}</h4>
//       <InformationFooter date={date} time={time}></InformationFooter>
//     </div>
//   )
// }
