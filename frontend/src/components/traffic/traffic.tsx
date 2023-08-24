import React from 'react'
import { Paragraph } from '../../styles/style'
import { TrafficDto } from '../../dto'
import { DatetimeFormatter } from '../../shared/utils'
import MyCarousel from '../../shared/carousel'
import { IMAGE_PATH, PLACEHOLDER_IMAGE } from '../../shared/constants'
import { InformationFooter, NullInfo, StartingText } from '../../shared/card-content'

interface TrafficDisplayProps {
  traffics: TrafficDto[]
}

const TrafficDisplayWrapper: React.FC<TrafficDisplayProps> = ({ traffics }) => {
  let content: JSX.Element

  if (!traffics) {
    content = content = <NullInfo imagePath={IMAGE_PATH} placeholderImage={PLACEHOLDER_IMAGE} infoType={'Traffic image'}></NullInfo>
  } else {
    const location = traffics[0]?.location
    const [date, time] = DatetimeFormatter(traffics[0]?.timestamp || null)

    if (traffics.length > 0) {
      content = (
        <div>
          <Paragraph>{`Location: ${location}`}</Paragraph>
          <InformationFooter date={date} time={time}></InformationFooter>
          <MyCarousel images={traffics}></MyCarousel>
        </div>
      )
    } else {
      content = <StartingText />
    }
  }
  return (
    <div>
      <h2 className='title'>Traffic Information</h2>
      {content}
    </div>
  )
}

export default TrafficDisplayWrapper
