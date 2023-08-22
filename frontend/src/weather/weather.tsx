import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import {Paragraph} from '../shared/style'
import { WeatherDto } from "../dto";

interface WeatherInfoProps {
  datetime: Dayjs | null;
  weather: WeatherDto | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ datetime, weather }) => {
  return (
    <div>
      <h2>Weather Information</h2>
      {(weather?.location && datetime) ? (
        <div>
          <h5>{`Forecast: ${weather?.forecast}`}</h5>
          <Paragraph>{`Location: ${weather?.location}`}</Paragraph>
          <Paragraph>{`Correct as of: ${datetime}`}</Paragraph>
        </div>
      ) : <Paragraph>Please select location and date & time</Paragraph>}
    </div>
  );
};

export default WeatherInfo;
