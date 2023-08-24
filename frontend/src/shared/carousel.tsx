import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { TrafficDto } from '../dto'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../style.css'

const renderSlides = (images: TrafficDto[]) =>
  images.map((image: TrafficDto) => (
    <div key={image.location}>
      <img className='carousel-img' src={image.image_url} alt='Traffic' />
    </div>
  ))

interface CarouselProps {
  images: TrafficDto[]
}

const MyCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [curTrafficLocation, setTrafficLocation] = useState('')
  const [curTrafficDatetime, setTrafficDatetime] = useState<Date>()

  if (images[0]?.location !== curTrafficLocation || images[0]?.timestamp !== curTrafficDatetime) {
    setCurrentIndex(0)
    setTrafficLocation(images[0]?.location)
    setTrafficDatetime(images[0]?.timestamp)
  }

  function handleChange(index: number) {
    setCurrentIndex(index)
  }

  return (
    <div className='my-carousel'>
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        selectedItem={currentIndex}
        onChange={handleChange}
        className='carousel-container'
      >
        {renderSlides(images)}
      </Carousel>
    </div>
  )
}

export default MyCarousel
