import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { TrafficDto } from "../dto";
import "../App.css";



const renderSlides = (images: TrafficDto[]) =>
  images.map((image: TrafficDto) => (
    <div key={image.location}>
      <img src={image.image_url} alt="Traffic" width="500" height="300" />
    </div>
  ));

interface CarouselProps {
    images: TrafficDto[];
}

const MyCarousel: React.FC<CarouselProps> = ({images}) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [curLocation, setCurLocation] = useState('')
  if (images[0]?.location !== curLocation) {
    setCurrentIndex(0)
    setCurLocation(images[0]?.location)
  }

  function handleChange(index: number) {
    setCurrentIndex(index);
  }

  
  return (
    <div className="my-carousel">
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        selectedItem={currentIndex}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides(images)}
      </Carousel>
    </div>
  );
}

export default MyCarousel