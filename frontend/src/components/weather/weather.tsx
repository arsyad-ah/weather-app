import React from "react";
import {Paragraph} from '../../shared/style'
import { WeatherDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";
import WeatherImage from "./weather-mapping";
import { EMPTY_FORECAST } from "../../shared/constants";

interface WeatherInfoProps {
  weather: WeatherDto | undefined;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  let content: JSX.Element;

  const formatTimestamp = DatetimeFormatter(weather?.timestamp || null)
  const forecast = weather?.forecast || EMPTY_FORECAST;

  if (!weather) {
    content = (
      <div>
        <Paragraph>{`Weather forecast is unavailable. Please check if datetime or location is correct.`}</Paragraph>
      </div>
    )
  } else {
    if (weather) {
      content = (
        <div>
          <h4>{`Forecast: ${forecast}`}</h4>
          <Paragraph>{`Location: ${weather?.location}`}</Paragraph>
          <WeatherImage weatherCondition={forecast}></WeatherImage>
          <Paragraph>{`Correct as of: ${formatTimestamp}`}</Paragraph>
        </div>
      )
    }
    else {
      content = (
        <div>
          <Paragraph>Please select location and date & time</Paragraph>
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Weather Information</h2>
      {content}
    </div>
  );
};

export default WeatherInfo;
