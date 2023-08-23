import React from "react";
import {Paragraph} from '../../shared/style'
import { WeatherDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";

interface WeatherInfoProps {
  weather: WeatherDto | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {

  const formatTimestamp = DatetimeFormatter(weather?.timestamp || null)

  return (
    <div>
      <h2>Weather Information</h2>
      {(weather) ? (
        <div>
          <h4>{`Forecast: ${weather?.forecast}`}</h4>
          <Paragraph>{`Location: ${weather?.location}`}</Paragraph>
          <Paragraph>{`Correct as of: ${formatTimestamp}`}</Paragraph>
        </div>
      ) : <Paragraph>Please select location and date & time</Paragraph>}
    </div>
  );
};

export default WeatherInfo;
