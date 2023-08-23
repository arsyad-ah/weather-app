import React from "react";
import {Paragraph} from '../../shared/style'
import { WeatherDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";
import WeatherImage from "./weather-mapping";

const EMPTY_FORECAST = 'No forecast available'

interface WeatherInfoProps {
  weather: WeatherDto | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {

  const formatTimestamp = DatetimeFormatter(weather?.timestamp || null)

  const forecast = weather?.forecast || EMPTY_FORECAST;

  return (
    <div>
      <h2>Weather Information</h2>
      {(weather) ? (
        <div>
          <h4>{`Forecast: ${forecast}`}</h4>
          <Paragraph>{`Location: ${weather?.location}`}</Paragraph>
          <WeatherImage weatherCondition={forecast}></WeatherImage>
          <Paragraph>{`Correct as of: ${formatTimestamp}`}</Paragraph>
        </div>
      ) : <Paragraph>Please select location and date & time</Paragraph>}
    </div>
  );
};

export default WeatherInfo;
