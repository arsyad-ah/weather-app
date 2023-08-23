import React from "react";

const CLOUDY = 'cloudy.png'
const PARTLY_CLOUDY = 'partly-cloudy.png'
const SUNNY = 'sunshine.png'
const OVERCAST = 'overcast.png'
const RAIN = 'rain.png'
const SHOWERS = 'showers.png'
const THUNDER = 'thunder.png'
const WINDY = 'windy.png'
const NO_IMAGE = 'placeholder.png'

const WeatherImageMapping: Record<string, string> = {
  "cloudy": CLOUDY,
  "partly_cloudy": PARTLY_CLOUDY,
  "sunny": SUNNY,
  "sunshine": SUNNY,
  'overcast': OVERCAST,
  'rain': RAIN,
  'shower': SHOWERS,
  'thunder': THUNDER,
  'windy': WINDY,
  'no_image': NO_IMAGE,
};

interface WeatherMappingProps {
  weatherCondition: string;
}

const WeatherImage: React.FC<WeatherMappingProps> = ({ weatherCondition }) => {
  let imageFilename: string;

  const cleanedWeatherCondition = weatherCondition
    .toLowerCase()
    .replace("(day)", "")
    .replace("(night)", "")
    .trim();
  
  // I am not too sure what are the different weather conditions from the API, but
  // these are what I can see so far.
  if (cleanedWeatherCondition.includes('partly cloudy')) {
    imageFilename = WeatherImageMapping.partly_cloudy
  } else if (cleanedWeatherCondition.includes('cloudy') || cleanedWeatherCondition.includes('cloud')){
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
  const imageUrl = `/assets/images/${imageFilename}`;  
  return (
    <div>
      <img src={imageUrl} alt='' height="200" />
    </div>
  );
}

export default WeatherImage;
